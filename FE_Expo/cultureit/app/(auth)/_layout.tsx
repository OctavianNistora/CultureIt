import React from 'react'
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import "../../global.css"

export default function AuthLayout() {
  return (
    <>
      <Stack>
          <Stack.Screen
            name = "log-in"
            options={{
                headerShown: false
            }}
          />

          <Stack.Screen
              name = "sign-up"
              options={{
                  headerShown: false
              }}
          />
      </Stack>

      <StatusBar
      style = "dark"/>
    </>
  )
}