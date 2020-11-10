/**
 *  Tasmota 6-Outlet Power Strip Device Handler
 *
 *  Authors
 *	 - JM Binette
 *
 *	Version 1.0 - 11/25/2019
 *
 *  Copyright 2019
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License. You may obtain a copy of the License at:
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License
 *  for the specific language governing permissions and limitations under the License.
 */
 
metadata {

    definition (name: "Tasmota 6-Outlet Power Bar", namespace: "jmbinette", author: "JM Binette") {
		capability "Actuator"
        capability "Switch"
        capability "Outlet"
		capability "Refresh"
        capability "Configuration"
		
	
		attribute "update", "string"		
		//attribute "device_details", "string"
        //attribute "details", "string"
        //attribute "wifi", "string"
        //attribute "rssiLevel", "number"
		attribute "healthStatus", "string"
        
        capability "Health Check"

            (1..6).each { n ->
                attribute "switch$n", "enum", ["on", "off"]
                command "on$n"
                command "off$n"
            }
        
	}

	simulator { 

    }

    // tile definitions
	tiles(scale: 2) {


		standardTile("refresh", "device.power", inactiveLabel: false, decoration: "flat", width: 2, height: 2) {
			state "default", label:'', action:"refresh.refresh", icon:"st.secondary.refresh"
		}


		(1..6).each { n ->
			standardTile("switch$n", "switch$n", canChangeIcon: true, decoration: "flat", width: 2, height: 2) {
				state "on", label: "switch$n", action: "off$n", icon: "st.switches.switch.on", backgroundColor: "#00a0dc"
				state "off", label: "switch$n", action: "on$n", icon: "st.switches.switch.off", backgroundColor: "#cccccc"
			}

		}

		main(["switch1"])
		details(["switch1",
				 "switch2","switch3","switch4",
				 "switch5","switch6","refresh",
                 ])
	}

}

def parse(description) {

}

def on1() {sendEvent(name: "switch1", value: "on", isStateChange: true)}
def on2() {sendEvent(name: "switch2", value: "on", isStateChange: true)}
def on3() {sendEvent(name: "switch3", value: "on", isStateChange: true)}
def on4() {sendEvent(name: "switch4", value: "on", isStateChange: true)}
def on5() {sendEvent(name: "switch5", value: "on", isStateChange: true)}
def on6() {sendEvent(name: "switch6", value: "on", isStateChange: true)}

def off1() {sendEvent(name: "switch1", value: "off", isStateChange: true)}
def off2() {sendEvent(name: "switch2", value: "off", isStateChange: true)}
def off3() {sendEvent(name: "switch3", value: "off", isStateChange: true)}
def off4() {sendEvent(name: "switch4", value: "off", isStateChange: true)}
def off5() {sendEvent(name: "switch5", value: "off", isStateChange: true)}
def off6() {sendEvent(name: "switch6", value: "off", isStateChange: true)}

def installed() {
    on()
	
}