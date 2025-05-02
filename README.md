# 🚀 Taask App

Una aplicación moderna de gestión de tareas construida con Next.js y Node.js, que permite a los usuarios organizar sus tareas de manera eficiente y efectiva.

![Taask App Banner](https://via.placeholder.com/800x400?text=Taask+App)

## ✨ Características

- 🔐 **Autenticación Segura**
  - Registro de usuarios
  - Inicio de sesión
  - Protección de rutas
  - Tokens JWT

- 📝 **Gestión de Tareas**
  - Crear tareas personalizadas
  - Editar título y descripción
  - Marcar tareas como completadas
  - Eliminar tareas
  - Filtrado por usuario

- 🎨 **Interfaz Moderna**
  - Diseño responsivo
  - Tema claro/oscuro
  - Animaciones suaves
  - Notificaciones elegantes
  - Estilo inspirado en Trello

## 🛠️ Tecnologías Utilizadas

### Frontend
- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Shadcn/ui
- Axios

### Backend
- Node.js
- Express
- MongoDB
- JWT
- Bcrypt
- Rate Limiting
- Error Logging

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/taask-app.git
cd taask-app
```

2. **Instalar dependencias del frontend**
```bash
cd Front
npm install
```

3. **Instalar dependencias del backend**
```bash
cd Back
npm install
```

4. **Configurar variables de entorno**

Frontend (.env.local):
```env
# URL del backend
NEXT_PUBLIC_API_URL=http://localhost:3002/api
# ID del cliente para autenticación (opcional)
NEXT_PUBLIC_API_CLIENT_ID=your_frontend_client_id
# Secreto del cliente para autenticación (opcional)
NEXT_PUBLIC_API_CLIENT_SECRET=your_frontend_client_secret
```

Backend (.env):
```env
# URI de conexión a MongoDB (requerido)
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database
# Puerto del servidor (opcional, por defecto 3002)
PORT=3001
# Entorno de ejecución (opcional)
NODE_ENV=development
# Secreto para generar tokens JWT (requerido)
JWT_SECRET=your_jwt_secret_key
# ID del cliente para autenticación (opcional)
API_CLIENT_ID=your_client_id
# Secreto del cliente para autenticación (opcional)
API_CLIENT_SECRET=your_client_secret
```

> **Nota**: Las variables marcadas como "requerido" son necesarias para el funcionamiento de la aplicación. Las variables marcadas como "opcional" tienen valores por defecto, pero puedes personalizarlas según tus necesidades.

> **⚠️ Importante**: Reemplaza los valores de ejemplo con tus propias credenciales. NUNCA compartas o subas al repositorio tus credenciales reales.

5. **Iniciar la aplicación**

Frontend:
```bash
cd Front
npm run dev
```

Backend:
```bash
cd Back
npm run dev
```

## 🌟 Uso

1. **Registro/Inicio de Sesión**
   - Crear una cuenta nueva
   - Iniciar sesión con credenciales existentes

2. **Gestión de Tareas**
   - Crear nueva tarea con título y descripción
   - Marcar tareas como completadas
   - Editar tareas existentes
   - Eliminar tareas no deseadas

3. **Navegación**
   - Interfaz intuitiva
   - Menú de navegación responsive
   - Acceso rápido a todas las funciones

## 🔒 Seguridad

- Autenticación mediante JWT
- Contraseñas hasheadas con bcrypt
- Protección contra ataques CSRF
- Rate limiting para prevenir abusos
- Validación de datos en frontend y backend

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👥 Autores

- **Tu Nombre** - *Desarrollo Full Stack* - [Tu GitHub](https://github.com/tu-usuario)

## 🙏 Agradecimientos

- Shadcn por su increíble biblioteca de componentes UI
- La comunidad de Next.js por su excelente documentación
- Todos los contribuidores que han ayudado a mejorar este proyecto

---
⌨️ con ❤️ por [Tu Nombre](https://github.com/tu-usuario)