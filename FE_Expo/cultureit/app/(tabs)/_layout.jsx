import { View, Text, Image, BackHandler } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import { icons } from '../../constants'

const TabIcon = ({icon, color, name, focused}) => {
  return (
    <View className="items-center justify-center"
          style={{ marginTop: 20 }}>
      
      <Image
        source = {icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className = {`${focused ? 'font-Inter-Bold' : 'font-Inter-Regular'} text-xs`}
        style = {{
          color: color,
          textAlign: 'center',
          width: 60,
        }}
      >
      {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
   <>
   <View
       style={{
           height: 75,
           backgroundColor: '#F7BA4B',
       }}
   />
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#393838',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: {
          backgroundColor: "#F7BA4B",
          height: 84
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