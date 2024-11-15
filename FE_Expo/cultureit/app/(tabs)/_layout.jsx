import { View, Text, Image } from 'react-native'
import React from 'react'
import {Tabs, Redirect} from 'expo-router'
import {icons} from '../../constants'

console.log('Imported icons:', icons);

const TabIcon = ({icon, color, name, focused}) => {
  return (
    <View>
      <Image
        source = {icon}
      />
    </View>
  )
}

const TabsLayout = () => {
  return (
   <>
    <Tabs>
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
    </Tabs>
   </>
  )
}

export default TabsLayout