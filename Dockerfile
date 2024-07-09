# Menggunakan image Node.js sebagai dasar
FROM node:16-alpine

# Menentukan direktori kerja
WORKDIR /app

# Menyalin package.json dan package-lock.json
COPY package*.json ./

# Menginstall dependensi
RUN npm install

# Menyalin seluruh kode aplikasi
COPY . .

# Mengekspos port yang digunakan oleh aplikasi
EXPOSE 3000

# Menjalankan aplikasi
CMD ["node", "server.js"]
