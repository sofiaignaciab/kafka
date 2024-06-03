import requests
import random
import string
import time
import csv
from concurrent.futures import ThreadPoolExecutor, as_completed

API_URL = 'http://localhost:3001/solicitudes'
NUM_REQUESTS = 100

def get_random_id():
    return random.randint(1, 5206091)

def get_random_email():
    domains = ['example.com', 'test.com', 'demo.com']
    domain = random.choice(domains)
    username = ''.join(random.choices(string.ascii_lowercase + string.digits, k=7))
    return f"{username}@{domain}"

def simulate_request():
    solicitud = {
        'correo': get_random_email(),
        'itemid': get_random_id()
    }

    start_time = time.time()
    
    try:
        response = requests.post(API_URL, json=solicitud)
        end_time = time.time()
        return {
            'id': response.json().get('id', None),
            'status': response.status_code,
            'duration': (end_time - start_time) * 1000  
        }
    except requests.RequestException as e:
        end_time = time.time()
        return {
            'id': None,
            'status': 'NETWORK_ERROR',
            'duration': (end_time - start_time) * 1000  
        }

def run_simulations():
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(simulate_request) for _ in range(NUM_REQUESTS)]
        results = [future.result() for future in as_completed(futures)]
    
    with open('metrics.csv', 'w', newline='') as csvfile:
        fieldnames = ['id', 'status', 'duration']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        
        writer.writeheader()
        writer.writerows(results)
    
    print('All requests have been processed and metrics are saved to metrics.csv')

if __name__ == '__main__':
    run_simulations()
