# Usa la imagen base de Node.js
FROM node:14

# Crea el directorio de la aplicación en el contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json a la raíz del contenedor
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto que la aplicación usará
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:dev"]