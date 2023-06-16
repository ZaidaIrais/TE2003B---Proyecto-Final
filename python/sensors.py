# ---- LIBRERIAS ----
import RPi.GPIO as GPIO
import Adafruit_DHT
import time
from smbus2 import SMBus
import requests
# ---- VARIABLES ----

def print_hex(data: list[bytes]) -> None:
  print([ hex(d) for d in data ])

def read_ads1115(i2c_addr: int, register: int) -> list[bytes]:
  with SMBus(bus=1) as bus:
    if register == 0x00:
      # bus.write_i2c_block_data(i2c_addr=i2c_addr, register=0x01, data=[0xC5, 0x83])
      bus.write_i2c_block_data(i2c_addr=i2c_addr, register=0x01, data=[0x85, 0x83])
      time.sleep(0.1)
    data = bus.read_i2c_block_data(i2c_addr=i2c_addr, register=register, length=2)
    return data

def map(val: int):
  return 100-((val*100)/127)

SENSOR_DHT = Adafruit_DHT.DHT11 # SEÑALIZAMOS EL SENSOR
PIN_DHT = 4 # SEÑALIZAMOS EL PIN 4
ventilador=24
SensorPin = 17
bomba_pin = 16

GPIO.setmode(GPIO.BCM)
GPIO.setup(SensorPin, GPIO.IN)
GPIO.setup(ventilador, GPIO.OUT)
GPIO.setup(bomba_pin, GPIO.OUT)

from gpiozero import MCP3008

# Configuración del MCP3008
mcp = MCP3008(channel=0)

# Rango de humedad del sensor (ajusta estos valores según tu sensor)
HUMEDAD_MINIMA = 0
HUMEDAD_MAXIMA = 100



# GPIO.setmode(GPIO.BOARD)
# GPIO.setup(LED,GPIO.OUT)
# GPIO.output(LED,GPIO.HIGH)
# time.sleep(2)
# GPIO.output(LED,GPIO.LOW)
# time.sleep(2)
# GPIO.cleanup()


GPIO.output(ventilador,GPIO.HIGH)
GPIO.output(bomba_pin,GPIO.HIGH)

message = {'gh_id': '9d0115e0-7723-4afe-86f0-a0866d0bb205'}
# ---- PROCESO ----
while True: 
    # HUMEDAD Y TEMPERATURA 
    fail = True
    humedad, temperatura = Adafruit_DHT.read(SENSOR_DHT, PIN_DHT)
    message['temperature'] = temperatura
    message['humidity'] = humedad
    print(temperatura, "°C")

    groundHumidity = read_ads1115(i2c_addr=0x48, register=0x00)[0]
    groundHumidity = map(groundHumidity)
    print(groundHumidity, '%')

    message['soilhumidity'] = groundHumidity

    # SI CONDICIONES PARA CAPTAR LA INFORMACIÓN 
    if humedad is not None and temperatura is not None:
        print("Temperatura={0:0.1f}C  Humedad={1:0.1f}%".format(temperatura,humedad))

        if temperatura > 30: 
            GPIO.output(ventilador,GPIO.LOW)
            message['fan'] = 1
            print("Prende ventilador")
        else:
            GPIO.output(ventilador,GPIO.HIGH)
            message['fan'] = 0
            print("Apaga ventilador")

            
            fail = False
    else:
        print("Falla en la lectura")

    if groundHumidity < 30: 
      GPIO.output(bomba_pin,GPIO.LOW)
      print("Prende bomba de agua")
      message['waterpump'] = 1
    else:
      GPIO.output(bomba_pin,GPIO.HIGH)
      print("Apaga bomba de agua")
      message['waterpump'] = 0

    if not fail:
       r = requests.post('http://localhost:3000/dashboard/api', json=message)
       print(r.json)
       
    time.sleep(3)
