/**
 *  WineSensor virtual device (MQTT)
 *
 */

metadata {
    definition (name: "WineSensor", namespace: "jmbinette", author: "JM Binette") {
        capability "Temperature Measurement"
        capability "Relative Humidity Measurement"
        capability "Sensor"
        capability "Health Check"
		capability "Battery"
        capability "Switch"

        command "temperatureamb"
		command "temperatureint"
        command "humidity"
		command "battery"
        command "pressionatm"

        command "processMQTT"

        //fingerprint profileId: "0104", deviceId: "0302", inClusters: "0000,0001,0003,0009,0402,0405"
    }

    // simulator metadata
    simulator {
        for (int i = 0; i <= 100; i += 10) {
            status "${i}F": "temperatureamb: $i F"
        }

        for (int i = 0; i <= 100; i += 10) {
            status "${i}%": "humidity: ${i}%"
        }

    }

    // UI tile definitions
    tiles {
        valueTile("temperatureint", "device.temperatureint", width: 2, height: 2) {
            state"temperatureint", label:'${currentValue}°C', unit:"dC"

        }

        valueTile("temperatureamb", "device.temperatureamb") {
            state "temperatureamb", label:'Ambient\n${currentValue}°C', unit:"dC"
        }
		
		valueTile("humidity", "device.humidity") {
            state "humidity", label:'Humidity\n${currentValue}%', unit:""
        }
		
		valueTile("battery", "device.battery") {
            state "battery", label:'Battery\n${currentValue}%', unit:""
        }
		standardTile("switch", "device.switch", width: 1, height: 1, canChangeIcon: true) {
			state "off", label: 'OTA_Mode', action: "switch.on", backgroundColor: "#ffffff", nextState: "on"
			state "on", label: 'OTA_Mode', action: "switch.off", backgroundColor: "#53a7c0", nextState: "off"
		}

        valueTile("healthStatus", "device.healthStatus", decoration: "flat", inactiveLabel: false) {
            state "online",  label: "ONLINE", backgroundColor: "#00A0DC", icon: "st.Health & Wellness.health9", defaultState: true
            state "offline", label: "OFFLINE", backgroundColor: "#E86D13", icon: "st.Health & Wellness.health9"
        }


        main(["temperatureint"])
        details(["temperatureint", "temperatureamb", "humidity", "battery", "switch", "healthStatus"])
    }
}

// health checks
def installed() {
    log.trace "Executing 'installed'"

    //sendEvent(name: "DeviceWatch-Enroll", value: [protocol: "cloud", scheme:"untracked"].encodeAsJson(), displayed: false)
    //markDeviceOnline()

    done()
}


def refresh() {
    log.trace "Executing refresh"

    //sendEvent(name: "temperatureamb", value: getTemperatureAmb(), unit: "°C")
    //sendEvent(name: "humidity", value: getHumidityPercent(), unit: "%")

    done()
}



def on() {
	log.trace("Setting status switch: on")
    sendEvent(name: "switch", value: "on",isStateChange: true)
    done()
}

def off() {
	log.trace("Setting status switch: off")
    sendEvent(name: "switch", value: "off", isStateChange: true)
    done()
}

def processMQTT(attribute, value){
	log.debug "Processing ${attribute} Event:  ${value} from MQTT for device: ${device}"	
    sendEvent(name: attribute, value: value)
	switch (attribute) {
		case 'update':
			updateTiles(value);
			break;
		default:
			break;
	}
}

def updateTiles(Object val ){
		//log.debug "Msg ${val}"
		if (['online','offline'].contains(val.toLowerCase())){
			log.debug "Received Health Check LWT event ${val}"
			(val.toLowerCase() == 'online') ? markDeviceOnline() : markDeviceOffline()		
			return;			
		}
		
		state.updates = (state.updates == null)  ? "" : state.updates +  val + "\n";
		def value = parseJson(val);	
		
		state.update1 = value?.Status ? true : state.update1 ?: false
		state.update2 = value?.StatusFWR ? true : state.update2 ?: false
		state.update3 = value?.StatusNET ? true : state.update3 ?: false
		state.update4 = value?.StatusSTS ? true : state.update4 ?: false
		
		state.topic = (value?.Status?.Topic) ?: state.topic
		state.friendlyName = (value?.Status?.FriendlyName) ?: state.friendlyName
		state.firmware = (value?.StatusFWR?.Version) ?: state.firmware 
		state.macAddress = ( value?.StatusNET?.Mac) ?: state.macAddress
		state.ipAddress = (value?.StatusNET?.IPAddress) ?: state.ipAddress
		if (value?.StatusSTS?.Time) state.currentTimestamp = Date.parse("yyyy-MM-dd'T'HH:mm:ss",value?.StatusSTS?.Time).format("EEE MMM dd, yyyy 'at' hh:mm:ss a")
		state.ssid1 = (value?.StatusSTS?.Wifi?.SSId) ?: state.ssid1
		state.upTime = (value?.StatusSTS?.Uptime) ?: state.upTime
		state.RSSI = (value?.StatusSTS?.Wifi?.RSSI) ?: state.RSSI
		state.rssiLevel = (value?.StatusSTS?.Wifi?.RSSI) ? (0..10).contains(state.RSSI) ? 1 
									   : (11..45).contains(state.RSSI)? 2
									   : (46..80).contains(state.RSSI)? 3
									   : (81..100).contains(state.RSSI) ? 4 : 5
									   : state.rssiLevel
									   
		//log.debug "Are updates ready ${state.update1}, ${state.update2}, ${state.update3}, ${state.update4}"
		//log.debug "Time is  ${state.currentTimestamp}"	
		if (state.update1 && state.update2 && state.update3 && state.update4){
			state.update1 = state.update2 = state.update3 = state.update4 = false;	
			runIn(3,fireEvents)
		}	
}


/**
 * Just mark the end of the execution in the log
 */
private void done() {
    log.trace "---- DONE ----"
}