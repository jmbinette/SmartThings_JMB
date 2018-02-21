preferences {
	input("email", "text", title: "E-mail", description: "Your neviweb® account login e-mail")
	input("password", "password", title: "Password", description: "Your neviweb® account login password")
	input("gatewayname", "text", title: "Network Name:", description: "Name of your neviweb® network")
	input("devicename", "text", title: "Device Name:", description: "Name of your neviweb® thermostat")
}

metadata {
	definition (name: "Sinope technologie Thermostat", namespace: "Sinope Technologie", author: "Mathieu Virole") {
		capability "Polling"
		capability "Thermostat"
        capability "Thermostat Heating Setpoint"
        capability "Thermostat Mode"
        capability "Thermostat Operating State"
		capability "Temperature Measurement"
		capability "Sensor"
        
		command "heatLevelUp"
		command "heatLevelDown"
        command "presenceHome"
        command "presenceAway"
        command "setPresence", ["string"]
        command "auto"
        command "off"
        command "frostSafe"
        command "away"
        command "poll"

		attribute "temperatureUnit", "string"
        attribute "heatingDemand", "string"
        attribute "thermMode", "string"
        attribute "thermPresence", "string" 
	}

	simulator {
		// TODO: define status and reply messages here
	}

	tiles(scale: 2) {
		multiAttributeTile(name: "thermostatMulti", type: "thermostat", width: 6, height: 4, canChangeIcon: true) {
			tileAttribute("device.temperature", key: "PRIMARY_CONTROL") {
				attributeState("default", label: '${currentValue}', unit: "dF", backgroundColor: "#269bd2")
			}
            
            tileAttribute("device.heatingSetpoint", key: "VALUE_CONTROL") {
				attributeState("VALUE_UP", action: "heatLevelUp")
				attributeState("VALUE_DOWN", action: "heatLevelDown")
			}
			tileAttribute("device.heatingDemand", key: "SECONDARY_CONTROL") {
				attributeState("default", label: '${currentValue}%', unit: "%")
			}
			tileAttribute("device.thermostatOperatingState", key: "OPERATING_STATE") {
				attributeState("idle", backgroundColor: "#44b621")
				attributeState("heating", backgroundColor: "#ffa81e")
				attributeState("cooling", backgroundColor: "#269bd2")
			}
			tileAttribute("device.thermostatMode", key: "THERMOSTAT_MODE") {
				attributeState("off", label: '${name}')
				attributeState("heat", label: '${name}')
			}
			tileAttribute("device.heatingSetpoint", key: "HEATING_SETPOINT") {
				attributeState("default", label: '${currentValue}', unit: "dF")
			}      
            tileAttribute("device.thermMode", key: "THERMOSTAT_MODE") {
				attributeState("Auto", label:'Auto', nextState:"Updating", defaultState: true)
                attributeState("Away", label:'Away', nextState:"Updating")
				attributeState("Standby", label:'Standby', nextState:"Updating")
                attributeState("Manual", label:'Manual', nextState:"Updating")
                attributeState("X-Bypass", label:'Manual', nextState:"Updating")
                attributeState("Updating", label:'Updating')
			}
		}

        //-- Value Tiles -------------------------------------------------------------------------------------------

		valueTile("temperature", "device.temperature", width: 4, height: 2) {
			state("temperature", label: '${currentValue}°',
				backgroundColors: getBackgroundColors()
			)
		}

		valueTile("heatingDemand", "device.heatingDemand", inactiveLabel: false, width: 2, height: 2, decoration: "flat") {
			state "heatingDemand", label: '${currentValue}%', unit: "%", backgroundColor: "#ffffff"
		}
        //-- Standard Tiles ----------------------------------------------------------------------------------------

		valueTile("heatingSetpoint", "device.heatingSetpoint", inactiveLabel: false, width: 2, height: 2, decoration: "flat") {
			state "heat", label: '${currentValue}°', backgroundColor: "#ffffff"
		}

		standardTile("heatLevelUp", "device.heatingSetpoint", inactiveLabel: false, width: 2, height: 2, decoration: "flat") {
			state "default", label: '', action: "heatingSetpointUp", icon: "st.thermostat.thermostat-up"
		}

		standardTile("heatLevelDown", "device.heatingSetpoint", inactiveLabel: false, width: 2, height: 2, decoration: "flat") {
			state "default", label: '', action: "heatingSetpointDown", icon: "st.thermostat.thermostat-down"
		}


		standardTile("operatingState", "device.thermostatOperatingState", width: 2, height: 2) {
			state "idle", label: '${name}', backgroundColor: "#ffffff"
			state "heating", label: '${name}', backgroundColor: "#e86d13"
			state "cooling", label: '${name}', backgroundColor: "#00A0DC"
		}
		standardTile("thermostatMode", "device.thermostatMode", inactiveLabel: false, height: 2, width: 2, decoration: "flat") {
			state "off", label: '', action: "switchMode", icon: "st.thermostat.heating-cooling-off"
			state "heat", label: '', action: "switchMode", icon: "st.thermostat.heat", defaultState: true
		}

		standardTile("temperatureDisplayMode", "device.temperatureDisplayMode", inactiveLabel: false, height: 2, width: 2, decoration: "flat") {
			state "Deg_C", label: '${name}', action: "setTemperatureDisplayMode", icon: "st.alarm.temperature.normal", defaultState: true
			state "Deg_F", label: '${name}', action: "setTemperatureDisplayMode", icon: "st.alarm.temperature.normal"
		}

		standardTile("occupancyStatus", "device.occupancyStatus", inactiveLabel: false, height: 2, width: 2, decoration: "flat") {
			state "occupy", label: '${name}', action: "setOccupancyStatus", icon: "st.Home.home4", defaultState: true
			state "unoccupy", label: '${name}', action: "setOccupancyStatus", icon: "st.presence.car.car"
		}
		standardTile("lockStatus", "device.keypadLockStatus", inactiveLabel: false, height: 2, width: 2, decoration: "flat") {
			state "unlock", label: '${name}', action: "setLockStatus", icon: "st.presence.house.unlocked", defaultState: true
			state "lock1", label: '${name}', action: "setLockStatus", icon: "st.presence.house.secured"
		}

		standardTile("refresh", "device.temperature", inactiveLabel: false, width: 2, height: 2, decoration: "flat") {
			state "default", action: "poll", icon: "st.secondary.refresh"
		}
		standardTile("weatherTemperature", "device.outdoorTemp", inactiveLabel: false, width: 2, height: 2,
			decoration: "flat", canChangeIcon: false) {
			state "default", label: 'OutdoorTemp ${currentValue}°', unit: "dF",
				icon: "st.Weather.weather2",
				backgroundColor: "#ffffff"
		}

		standardTile("configure", "device.configure", inactiveLabel: false, width: 2, height: 2, decoration: "flat") {
			state "configure", label: '', action: "configuration.configure", icon: "st.secondary.configure"
		}
        
        standardTile("thermPresence", "device.thermPresence", inactiveLabel: false, width: 2, height: 2) { //, decoration: "flat"
			state "Home", label:'Home', action:'presenceAway', backgroundColor: "#ADD8E6", icon: "st.Home.home2", nextState:"Updating"
			state "Away", label:'Away', action:'presenceHome', backgroundColor: "#44b621", icon: "st.Transportation.transportation2", nextState:"Updating"
            state "Updating", label:"Updating", backgroundColor: "#ffffff", icon: "st.secondary.secondary", defaultState: true
            
		}

        standardTile("thermMode", "device.thermMode", inactiveLabel: false, width: 2, height: 2, decoration: "flat" ) { 	//
            state "Auto", label:'', action:'thermostat.off', backgroundColor: "#ADD8E7", icon: "st.thermostat.auto", nextState:"Updating"
            state "Standby", label:'', action:'frostSafe', backgroundColor:"#C6C7CC", icon: "st.thermostat.heating-cooling-off", nextState:"Updating"
            state "Frost Safe", label:'Frost', action:'thermostat.auto', backgroundColor:"#DDFFFF", icon: "st.Weather.weather2", nextState:"Updating"
            state "Manual", label:'Manual', action:'thermostat.auto', backgroundColor: "#90d2a7", icon: "st.Office.office12", nextState:"Updating"
            state "X-Bypass", label:'Bypass', action:'thermostat.auto', backgroundColor: "#90d2a7", icon: "st.Office.office12", nextState:"Updating"
            state "Away", label:' Mode N/A ', backgroundColor: "#ffffff", nextState:"Updating" // icon: "st.secondary.secondary", 
            state "Updating", label:"Updating", action:'thermostat.auto', backgroundColor: "#ffffff", icon: "st.secondary.secondary", defaultState: true        
        }
        //-- Main & Details ----------------------------------------------------------------------------------------

		main("thermostatMulti")
		details(["thermostatMulti",
			//			"heatLevelUp","heatingSetpoint","heatLevelDown",
			"thermostatMode",
            "thermPresence",
            "thermMode",
			//			"occupancyStatus", 
			//			"lockStatus",
			//			"temperatureDisplayMode", 
			//			"configure",
			"refresh"
		])


	}
}

def setHeatingSetpoint(newSetpoint) {
	
	if(!isLoggedIn()) {
		log.info "Need to login"
		login()
	}

	if(data.error==true){
		logout()
	}else{
		def temperatureUnit = device.currentValue('temperatureUnit')
		def temperature
		log.info("setHeatingSetpoint -> Value :: ${newSetpoint}° ${temperatureUnit}")

		if (newSetpoint!=null){
			newSetpoint=newSetpoint.toDouble().round(2)
		}else{
			newSetpoint=null
		}
		
		switch (temperatureUnit) {
			case "celsius":
	         	temperature = newSetpoint    
	        break;

	        case "fahrenheit":
				temperature = fToC(newSetpoint)
			break;
	    }
		
	    log.info("setHeatingSetpoint _ STEP2 -> NEW Value :: ${temperature}° C")
		//sendEvent(name: 'heatingSetpoint', value: newSetpoint, unit: temperatureUnit)
    	
		def params = [
			uri: "${data.server}",
			path: "api/device/${data.deviceId}/setpoint",
			headers: ['Session-Id' : data.auth.session],
		 	body: ['temperature': temperature]
		]

		log.warn(params)
		
	    httpPut(params){
	    	resp ->resp.data
	      	log.info("setHeatingSetpoint -> API response :: ${resp.data}") 
	    }

       	poll() 
	}
}		

def heatLevelUp(){
	if(!isLoggedIn()) {
		log.info "Need to login"
		login()
	}
	if(data.error==true){
		logout()
	}else{
       	def newSetpoint = FormatTemp(data.status.setpoint)
       	def temperatureUnit = device.currentValue('temperatureUnit')
        if (newSetpoint != null){
			switch (temperatureUnit) {
			
				case "celsius":
			        newSetpoint = newSetpoint + 0.5
			        if (newSetpoint >= 30) {
						newSetpoint = 30
					}     
			    break;

			    case "fahrenheit":
					newSetpoint = device.currentValue("heatingSetpoint") + 1
					if (newSetpoint >= 86) {
						newSetpoint = 86
					} 
				break;
			}

		}
		setHeatingSetpoint(newSetpoint)
	}
}

def heatLevelDown(){
	if(!isLoggedIn()) {
		log.info "Need to login"
		login()
	}
	if(data.error==true){
		logout()
	}else{
		def newSetpoint = FormatTemp(data.status.setpoint)
        def temperatureUnit = device.currentValue('temperatureUnit')
		if (newSetpoint != null){
			switch (temperatureUnit) {
					
				case "celsius":
		         	newSetpoint = device.currentValue("heatingSetpoint") - 0.5
		         	if (newSetpoint <= 5) {
						newSetpoint = 5
					}      
		        break;
		       
		        default:
					newSetpoint = device.currentValue("heatingSetpoint") - 1
					if (newSetpoint <= 41) {
						newSetpoint = 41
					}  
				break;
			}
		}
		setHeatingSetpoint(newSetpoint)
	}
}

def poll() {
	if(!isLoggedIn()) {
		login()
	}else{
		if(data.error==true){
			logout()
		}else{
			DeviceData()
			runIn(200, poll)
		}	
	}
}

def login() {
	data.server="https://neviweb.com/"
    def params = [
        uri: "${data.server}",
        path: 'api/login',
        requestContentType: "application/x-www-form-urlencoded; charset=UTF-8",
        body: ["email": settings.email, "password": settings.password, "stayConnected": "0"]
    ]
    httpPost(params) { resp ->
        data.auth = resp.data
        if (data.auth.error){
        	log.warn(data.auth.error)
        	sendEvent(name: 'temperature', value: "ERROR LOGIN", state: temperatureType)
        	log.error("Authentification failed or request error")
        	data.error=true
        	logout()
    	}else{
    		log.info("login and password :: OK")
        	data.error=false
        	gatewayId()
    	} 
    }
}

def logout() {
      	def params = [
			uri: "${data.server}",
	        path: "api/logout",
	       	requestContentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        headers: ['Session-Id' : data.auth.session]
    	]
        httpGet(params) {resp ->
			data.auth = resp.data
        }
        log.info("logout :: OK")  
}

def gatewayId(){
	def params = [
		uri: "${data.server}",
        path: "api/gateway",
       	requestContentType: "application/json, text/javascript, */*; q=0.01",
        headers: ['Session-Id' : data.auth.session]
    ]
    httpGet(params) { response ->
        data.gateway_list = response.data
    }
    def gatewayName=settings.gatewayname
	gatewayName=gatewayName.toLowerCase().replaceAll("\\s", "")
	for(var in data.gateway_list){

    	def name_gateway=var.name
    	name_gateway=name_gateway.toLowerCase().replaceAll("\\s", "")

    	if(name_gateway==gatewayName){
    		data.gatewayId=var.id
    		log.info("gateway ID is :: ${data.gatewayId}")
    		data.error=false
    		deviceId()
    	}
    }
    if (data?.gatewayId==null){
    	sendEvent(name: 'temperature', value: "ERROR GATEWAY", state: temperatureType)
    	log.error("no gateway with this name or request error")
    	data.error=true
    	logout()
    }
}

def deviceId(){

	def params = [
		uri: "${data.server}",
        path: "api/device",
        query: ['gatewayId' : data.gatewayId],
       	requestContentType: "application/json, text/javascript, */*; q=0.01",
        headers: ['Session-Id' : data.auth.session]
   	]
    httpGet(params) {resp ->
		data.devices_list = resp.data
    }
    def deviceName=settings.devicename
	deviceName=deviceName.toLowerCase().replaceAll("\\s", "")
    for(var in data.devices_list){
    	def name_device=var.name
    	name_device=name_device.toLowerCase().replaceAll("\\s", "")
    	if(name_device==deviceName){
    		data.deviceId=var.id
    		log.info("device ID is :: ${data.deviceId}")
    		DeviceData()
    		data.error=false
    	}	
    }
    if (data?.deviceId==null){
    	sendEvent(name: 'temperature', value: "ERROR DEVICE", state: temperatureType)
    	log.error("no device with this name or request error")
    	data.error=true
    	logout()
    }	
}

def isLoggedIn() {
	log.info ("Is it login?")
	if (data?.auth?.session!=null){
		try{
			def params = [
				uri: "${data.server}",
			    path: "api/gateway",
			   	requestContentType: "application/json, text/javascript, */*; q=0.01",
			    headers: ['Session-Id' : data.auth.session]
			]
			httpGet(params) {resp ->
			    if(resp.data.sessionExpired==true){
			    	log.info "No session Expired"
			    	data.auth=""
			    }
			}
			if(!data.auth) {
				return false
				log.error("not pass log")
			} else {
				if (data?.deviceId!=null){
					return true
				}else{
					return false
					log.error("not device or gateway with this name")
				}
			}
		}catch (e){
			log.error(e)
			return false
		}
	}else{
		return false
	}
}

def DeviceData(){
	def temperature
    def heatingSetpoint
    def range
	def temperatureUnit
	def	thermostatOperatingState
    def thermPresence = ""
    def thermMode = ""
    
    
   	def params = [
		uri: "${data.server}api/device/${data.deviceId}/data?force=1",
		requestContentType: "application/x-www-form-urlencoded; charset=UTF-8",
        headers: ['Session-Id' : data.auth.session]
    ]

    httpGet(params) {resp ->
		data.status = resp.data
    }

    log.info("Data device is :: ${data.status}")

    if(data?.auth?.user?.format?.temperature == "c"){
    	temperatureUnit = "celsius"
    }else{
    	temperatureUnit = "fahrenheit"
    }
    
    sendEvent(name: "temperatureUnit",   value: temperatureUnit)
    
    switch (temperatureUnit) {

        case "celsius":
        	log.info("celsius temperature")
        	temperature = FormatTemp(data.status.temperature)
        	heatingSetpoint = FormatTemp(data.status.setpoint)
        break;

        case "fahrenheit":
        	log.info("fahrenheit temperature")
        	temperature = FormatTemp(data.status.temperature)
        	heatingSetpoint = FormatTemp(data.status.setpoint)
        break;
    }
    
	sendEvent(name: 'temperature', value: temperature, unit: temperatureUnit)	
	sendEvent(name: 'heatingSetpoint', value: heatingSetpoint, unit: temperatureUnit)
    sendEvent(name: 'heatingDemand', value: "${data.status.heatLevel}")
	sendEvent(name: "thermostatMode", value: "heat")
     
    
    if(data.status.heatLevel > 0){
    	thermostatOperatingState = "heating"
    }else{
    	thermostatOperatingState = "idle"
    }
	sendEvent(name: "thermostatOperatingState", value: thermostatOperatingState)
    
    log.debug "data.status == ${data.status}"
    
    switch (data.status.mode) {		
    	case 0: 			
			thermPresence = "Home"
        	thermMode = "Standby"            
			break;
        
        case 1: 			
			thermPresence = "Home"
        	thermMode = "Frost Safe"            
			break;
            
	    case 2: 			
			thermPresence = "Home"
	        thermMode = "Manual"
			break;
    
	    case 3: 			
			thermPresence = "Home"
	        thermMode = "Auto"
			break;
    
	    case 5: 			
			thermPresence = "Away"
	        thermMode = "Away"
			break;

	    case 131: 			
			thermPresence = "Home"
	        thermMode = "X-Bypass"
			break;

	}  
    sendEvent(name: 'thermPresence', value: thermPresence, display: false) //isStateChange: true,
    sendEvent(name: 'thermMode', value: thermMode, display: false)	    //isStateChange: true,
    
    log.debug "myPresence == ${thermPresence}"
    log.debug "myMode == ${thermMode}"
}

def FormatTemp(temp){
	def temperatureUnit = device.latestValue('temperatureUnit')
	if (temp!=null){
		float i=Float.valueOf(temp)
		switch (temperatureUnit) {
	        case "celsius":
				return (Math.round(i*2)/2).toDouble().round(2)
				log.warn((Math.round(i*2)/2).toDouble().round(2))
	        break;

	        case "fahrenheit":
	        	return (Math.ceil(cToF(i))).toDouble().round(2)
	        	log.warn(Math.ceil(cToF(i)).toDouble().round(2))
	        break;
	    }
    }else{
    	return null
    }
}

def cToF(temp) {
	return ((( 9 * temp ) / 5 ) + 32)
	log.info "celsius -> fahrenheit"
}

def fToC(temp) {
	return ((( temp - 32 ) * 5 ) / 9)
	log.info "fahrenheit -> celsius"
}

def getBackgroundColors() {
	def results
	if (state?.scale == 'C') {
		// Celsius Color Range
		results = [
			[value: 0, color: "#153591"],
			[value: 7, color: "#1e9cbb"],
			[value: 15, color: "#90d2a7"],
			[value: 23, color: "#44b621"],
			[value: 29, color: "#f1d801"],
			[value: 35, color: "#d04e00"],
			[value: 37, color: "#bc2323"]
		]
	} else {
		results =
			// Fahrenheit Color Range
			[
				[value: 31, color: "#153591"],
				[value: 44, color: "#1e9cbb"],
				[value: 59, color: "#90d2a7"],
				[value: 74, color: "#44b621"],
				[value: 84, color: "#f1d801"],
				[value: 95, color: "#d04e00"],
				[value: 96, color: "#bc2323"]
			]
	}
	return results
       
}

//		PRESENCE FUNCTIONS
def presenceAway() {
	log.trace "presenceAway: "
	unschedule(logout)    
	setPresence('Away')
}

def presenceHome() {
	log.trace "presenceHome: " 
    unschedule(logout)
    setPresence('Home')
}

private setPresence(status) {
    log.trace "TEST !"  
   
	if(!isLoggedIn()) {
		log.info "Need to login"
		login()
	}

	if(data.error==true){
		logout()
	}else{
		
		log.trace "setPresence(${status}: "    
	    sendEvent(name: "thermMode", value: "Updating", isStateChange:true)
		
        switch (status) {
        
		case "Home":
			log.trace "setPresence: Home"        
            log.debug "Switching Presence to Home / data.status.mode = 3"           
			def params = [
				uri: "${data.server}",
				path: "api/device/${data.deviceId}/mode",
				headers: ['Session-Id' : data.auth.session],
		 		body: ['mode': 3]
			]
			log.warn(params)
		
	    	httpPut(params){
	    	resp ->resp.data
	      	log.info("setHeatingSetpoint -> API response :: ${resp.data}") 
	    	}
            
            break;
            
		case "Away":
			log.trace "setPresence: Away "        
            state.lastPresence = device.currentValue("thermPresence") 
            log.debug "Switching Presence to Away / data.status.mode = 5"
			def params = [
				uri: "${data.server}",
				path: "api/device/${data.deviceId}/mode",
				headers: ['Session-Id' : data.auth.session],
		 		body: ['mode': 5]
			]
			log.warn(params)
		
	    	httpPut(params){
	    	resp ->resp.data
	      	
	    	}	
            
            break;
	}
    	
       	poll() 
	}
}		

//		AUTO & OFF FUNCTIONS
def off() {
	log.trace "off():"
    
	if(!isLoggedIn()) {
		log.info "Need to login"
		login()
	}
	
			def params = [
				uri: "${data.server}",
				path: "api/device/${data.deviceId}/mode",
				headers: ['Session-Id' : data.auth.session],
		 		body: ['mode': 0]
			]
			log.warn(params)
		
	    	httpPut(params){
	    	resp ->resp.data
	      	log.info("off -> API response :: ${resp.data}") 
	    	}

	poll()
}
def frostSafe() {
	log.trace "frostSafe():"
    
	if(!isLoggedIn()) {
		log.info "Need to login"
		login()
	}
	
			def params = [
				uri: "${data.server}",
				path: "api/device/${data.deviceId}/mode",
				headers: ['Session-Id' : data.auth.session],
		 		body: ['mode': 1]
			]
			log.warn(params)
		
	    	httpPut(params){
	    	resp ->resp.data
	      	log.info("frostSafe -> API response :: ${resp.data}") 
	    	}

	poll()
}

def away() {
	log.trace "away():"
    
	if(!isLoggedIn()) {
		log.info "Need to login"
		login()
	}
	
			def params = [
				uri: "${data.server}",
				path: "api/device/${data.deviceId}/mode",
				headers: ['Session-Id' : data.auth.session],
		 		body: ['mode': 5]
			]
			log.warn(params)
		
	    	httpPut(params){
	    	resp ->resp.data
	      	log.info("away -> API response :: ${resp.data}") 
	    	}

	poll()
}

def auto() {
	log.trace "auto():"
    
	if(!isLoggedIn()) {
		log.info "Need to login"
		login()
	}
	
			def params = [
				uri: "${data.server}",
				path: "api/device/${data.deviceId}/mode",
				headers: ['Session-Id' : data.auth.session],
		 		body: ['mode': 3]
			]
			log.warn(params)
		
	    	httpPut(params){
	    	resp ->resp.data
	      	log.info("auto -> API response :: ${resp.data}") 
	    	}

	poll()
}