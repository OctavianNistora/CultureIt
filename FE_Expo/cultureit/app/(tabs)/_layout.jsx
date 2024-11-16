import { View, Text, Image, BackHandler } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import { icons } from '../../constants'

const TabIcon = ({icon, color, name, focused}) => {
  return (
    <View className="items-center justify-center">
      <Image
        source = {icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className = {`${focused ? 'font-Inter-Bold' : 'font-Inter-Regular'} text-xs`}>
      {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
   <>
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#F7BA4B',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: "#F3E9B5"
        }
      }}
    >
      
      <Tabs.Screen
              name = "map"
              options = {{
                title: 'Map',
                headerShown: false,
                tabBarIcon: ({color, focused}) => ( 
                  <TabIcon
                    icon = {icons.map}
                    color = {color}
                    name = "Map"
                    focused={focused}
                  />
                )
              }}
            />
              
      <Tabs.Screen
              name = "trending"
              options = {{
                title: 'Trending',
                headerShown: false,
                tabBarIcon: ({color, focused}) => ( 
                  <TabIcon
                    icon = {icons.trending}
                    color = {color}
                    name = "Trending"
                    focused={focused}
                  />
                )
              }}
      />

      <Tabs.Screen
              name = "favorites"
              options = {{
                title: 'Favorites',
                headerShown: false,
                tabBarIcon: ({color, focused}) => ( 
                  <TabIcon
                    icon = {icons.favorites}
                    color = {color}
                    name = "Favorites"
                    focused={focused}
                  />
                )
              }}
            />

      <Tabs.Screen
              name = "profile"
              options = {{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({color, focused}) => ( 
                  <TabIcon
                    icon = {icons.profile}
                    color = {color}
                    name = "Profile"
                    focused={focused}
                  />
                )
              }}
            />
    </Tabs>
   </>
  )
}

export default TabsLayout