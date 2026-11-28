from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver=webdriver.Chrome()

driver.get("http://0.0.0.0:5500/index.html")

usuario=driver.find_element(By.ID,"usuario")
passwd=driver.find_element(By.ID,"contra")
buttonIngresar=driver.find_element(By.CSS_SELECTOR,"button[type='submit']")

usuario.send_keys("marco")
passwd.send_keys("12345")
time.sleep(1)
buttonIngresar.click()

print("Elemtnos localizados")

print("pagina: ", driver.title)

time.sleep(2)

driver.quit()
