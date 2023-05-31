import React from 'react'
import { useColorScheme } from 'react-native'
import { ThemeProvider } from '@shopify/restyle'
import { Slot } from 'expo-router'
import { darkTheme, lightTheme } from 'app/theme'
import LoadingModal from 'app/components/LoadingModal'
import { ProtectedRoute } from 'app/components/ProtectedRoute'

export default function Root() {
  const colorScheme = useColorScheme()
  const selectedTheme = colorScheme === 'dark' ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={selectedTheme}>
      <ProtectedRoute>
        <Slot />
      </ProtectedRoute>
      <LoadingModal />
    </ThemeProvider>
  )
}
