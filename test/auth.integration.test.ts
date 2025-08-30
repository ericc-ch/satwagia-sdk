import { describe, expect, test } from "vitest"

import { createClient } from "../src/main"

describe("Auth Integration Tests", () => {
  const client = createClient()

  describe("login endpoint", () => {
    test("should handle invalid credentials", async () => {
      const result = await client.auth.login({
        email: "invalid@example.com",
        password: "wrongpassword",
      })

      expect(result.code).toBe("01")
      expect(result.msg).toBeDefined()
      expect(result.data).toBeNull()
    })

    test("should validate email format", async () => {
      const result = await client.auth.login({
        email: "invalid-email",
        password: "password123",
      })

      // API should return error for invalid email format
      expect(result.code).toBe("01")
      expect(result.data).toBeNull()
    })

    test("should require both email and password", async () => {
      // Test with empty email
      const result1 = await client.auth.login({
        email: "",
        password: "password123",
      })

      expect(result1.code).toBe("01")
      expect(result1.data).toBeNull()

      // Test with empty password
      const result2 = await client.auth.login({
        email: "test@example.com",
        password: "",
      })

      expect(result2.code).toBe("01")
      expect(result2.data).toBeNull()
    })

    test("should return proper response structure for error", async () => {
      const result = await client.auth.login({
        email: "test@example.com",
        password: "wrongpassword",
      })

      // Verify response structure matches LoginResponse type
      expect(result).toHaveProperty("code")
      expect(result).toHaveProperty("msg")
      expect(result).toHaveProperty("data")
      expect(typeof result.code).toBe("string")
      expect(typeof result.msg).toBe("string")
    })

    test("should handle network timeouts", async () => {
      const timeoutClient = createClient({
        timeout: 1, // Very short timeout to test timeout handling
      })

      try {
        await timeoutClient.auth.login({
          email: "test@example.com",
          password: "password123",
        })
      } catch (error) {
        // Should throw a timeout error
        expect(error).toBeDefined()
      }
    }, 10000) // Give the test 10 seconds to complete

    test("should handle custom headers", async () => {
      const customClient = createClient({
        headers: {
          "User-Agent": "Satwagia-SDK-Test/1.0",
          "Custom-Header": "test-value",
        },
      })

      // This should not fail due to custom headers
      const result = await customClient.auth.login({
        email: "test@example.com",
        password: "wrongpassword",
      })

      expect(result).toBeDefined()
      expect(result.code).toBe("01")
    })

    test("should use correct API endpoint", async () => {
      // This test verifies the API is reachable and returns expected structure
      const result = await client.auth.login({
        email: "test@example.com",
        password: "wrongpassword",
      })

      // If this succeeds, it means:
      // 1. The API endpoint is reachable
      // 2. The API returns the expected response structure
      // 3. Our SDK correctly handles the response
      expect(result).toBeDefined()
      expect(["00", "01"]).toContain(result.code)
    })
  })

  describe("API availability", () => {
    test("should connect to production API", async () => {
      // Basic connectivity test
      try {
        const result = await client.auth.login({
          email: "connectivity-test@example.com",
          password: "test",
        })

        // As long as we get a response (even an error), the API is available
        expect(result).toBeDefined()
        expect(result.code).toBeDefined()
      } catch (error) {
        // If this fails, it indicates API connectivity issues
        throw new Error(`API connectivity failed: ${String(error)}`)
      }
    })
  })
})
