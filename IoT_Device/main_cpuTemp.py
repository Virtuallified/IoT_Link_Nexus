# Program to read CPU temperature from a DHT11 sensor and send it, along with other device details, to Firebase Realtime Database
import network
import machine
import utime
import ntptime
import ujson
import urequests
from machine import ADC, Pin
from time import sleep
import os
import ubinascii
import uuid

# Configure your Wi-Fi network settings
WIFI_SSID = 'WiFi-SSID'
WIFI_PASSWORD = 'WiFi-Password'

# Firebase project configuration
FIREBASE_URL = 'firebase-realtime-database-url'
FIREBASE_AUTH_EMAIL = 'your-authenticated-email'
FIREBASE_AUTH_PASSWORD = 'your-password'

# Define the interval for sending data (in seconds)
SEND_INTERVAL = 10

# Initialize Wi-Fi connection
wifi = network.WLAN(network.STA_IF)
wifi.active(True)
wifi.connect(WIFI_SSID, WIFI_PASSWORD)

# Wait for the Wi-Fi connection to be established
while not wifi.isconnected():
    pass

print("Connected to Wi-Fi")

# GPIO Pins
led = Pin("LED", machine.Pin.OUT)

# Function to CPU read temperature (using an example analog sensor)
def read_temperature():
    sensor_temp = machine.ADC(machine.ADC.CORE_TEMP)
    conversion_factor = 3.3 / (65535)
    reading = sensor_temp.read_u16() * conversion_factor
    temperature = 27 - (reading - 0.706)/0.001721
    return round(temperature, 3) # Will round to decimal with three decimal places

# Function to generate a unique ID for each entry
def generate_unique_id():
    entry_id = str(uuid.uuid4())
    return entry_id

# Function to convert Unix timestamp to a human-readable date and time
def unix_timestamp_to_datetime(unix_timestamp):
    dt = time.localtime(unix_timestamp)
    return "{:04}-{:02}-{:02} {:02}:{:02}:{:02}".format(dt[0], dt[1], dt[2], dt[3], dt[4], dt[5])

def format_timezone_wise_datetime(timestamp):
    # Convert the timestamp to seconds since epoch
    timestamp_seconds = utime.mktime(timestamp)

    # Add the time offset for Kolkata (GMT +05:30)
    kolkata_offset = 5 * 3600 + 30 * 60
    timestamp_seconds += kolkata_offset

    # Convert the timestamp to a human-readable format
    kolkata_time = utime.localtime(timestamp_seconds)

    # Format the time as a string ('YYYY-MM-DD HH:MM:SS')
    formatted_time = "{:04}-{:02}-{:02} {:02}:{:02}:{:02}".format(
        kolkata_time[0], kolkata_time[1], kolkata_time[2],
        kolkata_time[3], kolkata_time[4], kolkata_time[5]
    )
    
    return formatted_time

# Function to check the 'liveStatus' from Firebase and determine if the device should send data
def check_powerswitch():
    try:
        firebase_url = FIREBASE_URL + '/power-switch.json'
        response = urequests.get(firebase_url)

        if response.status_code == 200:
            live_status = ujson.loads(response.text)

            # Check the 'liveStatus' value
            if live_status.get('liveStatus', False):
                return True  # Send data
            else:
                return False  # Do not send data

        return False  # Default to not sending data if there's an issue

    except Exception as e:
        print("Error checking liveStatus:", e)
        return False  # Default to not sending data if there's an error

# Main loop
while True:
    dispatch = check_powerswitch()
    
    if dispatch:
        entry_id = generate_unique_id()
        temperature = read_temperature()
        # Generate a unique device ID (you can customize this)
        device_id = ubinascii.hexlify(machine.unique_id()).decode().upper()
        # Device information
        device_name = 'Raspberry Pi Pico W'
        firmware_version = os.uname().release  # Get the MicroPython firmware version
        ip_address = wifi.ifconfig()[0]  # Get the device's IP address
        mac_address = ubinascii.hexlify(network.WLAN().config('mac'), ':').decode()
        ntptime.settime()
        timestamp = time.time()
        
        data = {
            '_id': entry_id,
            'device_id': device_id,
            'device_name': device_name,
            'firmware_version': firmware_version,
            'ip_address': ip_address,
            'mac_address': mac_address,
            'humidity': temperature + 15, # Random value as no humidity sensor attached
            'temperature': temperature,
            'timestamp': timestamp,
            'updatedAt': format_timezone_wise_datetime(time.localtime())  # Convert timestamp to datetime
        }

        # For led.toggle()
        led.on()
        try:
            # Send data to Firebase Realtime Database
            firebase_url = FIREBASE_URL + '/sensor-data.json'
            headers = {'Content-Type': 'application/json'}
            auth = (FIREBASE_AUTH_EMAIL, FIREBASE_AUTH_PASSWORD)
            response = urequests.patch(firebase_url, data=ujson.dumps(data), headers=headers, auth=auth)

            if response.status_code == 200:
                print("[✓] Data sent to Firebase")
            else:
                print("[X] Failed to send data to Firebase")
                print("Response:", response.text)

            response.close()

        except Exception as e:
            print("Error:", e)
        led.off()
    else:
        print('[⚠] Tracking Off')
    
    # Wait for the specified interval before sending the next data
    sleep(SEND_INTERVAL)
