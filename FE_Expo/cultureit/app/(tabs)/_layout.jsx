import { View, Image } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import {icons} from '../../constants/icons'

const TabIcon = ({icon}) => {
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