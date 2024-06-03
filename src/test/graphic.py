import pandas as pd
import matplotlib.pyplot as plt

# Leer los datos del CSV
df = pd.read_csv('metrics.csv')

# Calcular el tiempo total en segundos
total_time = df['duration'].sum() / 1000

# Calcular el throughput
throughput = len(df) / total_time

# Calcular la tasa de éxito
success_rate = df[df['status'] == 201].shape[0] / len(df) * 100

# Calcular la latencia promedio
latency = df['duration'].mean()

# Configurar el tamaño de la figura
plt.figure(figsize=(12, 6))

# Gráfico de distribución de latencia
plt.subplot(1, 2, 1)
plt.hist(df['duration'], bins=30, color='blue', edgecolor='black')
plt.xlabel('Latency (ms)')
plt.ylabel('Frequency')
plt.title('Latency Distribution')
plt.grid(True)

# Gráfico de throughput
plt.subplot(1, 2, 2)
plt.bar(['Throughput'], [throughput], color='green', edgecolor='black')
plt.ylabel('Requests per second')
plt.title('Throughput')
plt.ylim(0, max(throughput * 1.2, 10))  # Ajustar el límite superior del eje y
plt.grid(True)

# Ajustar el layout
plt.tight_layout()

# Guardar y mostrar la figura
plt.savefig('performance_metrics.png')
plt.show()

# Imprimir métricas
print(f"Total Requests: {len(df)}")
print(f"Total Time: {total_time:.2f} seconds")
print(f"Throughput: {throughput:.2f} requests/second")
print(f"Success Rate: {success_rate:.2f}%")
print(f"Average Latency: {latency:.2f} ms")