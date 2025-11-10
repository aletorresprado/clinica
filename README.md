🏥 Sistema de Gestión de Turnos Médicos
<div align="center">
https://img.icons8.com/color/96/000000/hospital.png

Un sistema completo para la gestión de turnos médicos con tres tipos de usuarios

https://img.shields.io/badge/React-18.2.0-blue?logo=react
https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css
https://img.shields.io/badge/React_Router-6.8.0-CA4245?logo=react-router

</div>
👥 Tipos de Usuarios
1. 👤 Pacientes
Los pacientes pueden solicitar turnos médicos y gestionar sus citas.

🔑 Formularios de Acceso:
📍 Login de Paciente: /login

📝 Registro de Paciente: /register

🎯 Funcionalidades:
✅ Registrarse en el sistema

🔐 Iniciar sesión de forma segura

📅 Solicitar nuevos turnos médicos

👀 Ver el estado de sus turnos (🟡 pendiente, 🟢 aprobado, 🔴 rechazado)

❌ Cancelar/rechazar sus propios turnos

2. 🩺 Profesionales Médicos
Los profesionales médicos pueden ver los turnos asignados a ellos.

🔑 Formularios de Acceso:
📍 Login de Profesional: /proflogin

📝 Registro de Profesional: /profregister

🎯 Funcionalidades:
🏥 Registrarse como profesional (especialidad requerida)

🔐 Iniciar sesión en su panel

📋 Ver turnos asignados específicamente a ellos

⚠️ Rechazar turnos asignados si es necesario

📊 Ver información completa del paciente y motivo de consulta

3. ⚙️ Administradores
Los administradores gestionan todo el sistema de turnos.

🔑 Formularios de Acceso:
📍 Login de Administrador: /admin

📝 Registro de Administrador: /admin/register

🎯 Funcionalidades:
👁️ Ver todos los turnos del sistema

🔍 Filtrar turnos por estado (todos, pendientes, aprobados, rechazados)

✅ Aprobar o rechazar turnos pendientes

👨‍⚕️ Asignar profesionales a turnos específicos

🔄 Reasignar turnos a diferentes profesionales

❌ Rechazar turnos ya asignados

🎛️ Gestionar el ciclo completo de los turnos

🚀 Flujo del Sistema
📋 Para Pacientes:

1. 📝 Registro en /register
2. 🔐 Login en /login  
3. 📅 Solicitar turno desde el Dashboard
4. ⏳ Esperar aprobación del administrador
5. 📬 Recibir notificación cuando sea asignado

🩺 Para Profesionales:

1. 📝 Registro en /profregister (especialidad requerida)
2. 🔐 Login en /proflogin
3. 👀 Ver turnos asignados en su Dashboard
4. ⚙️ Gestionar sus turnos disponibles

⚙️ Para Administradores:

1. 📝 Registro en /admin/register
2. 🔐 Login en /admin
3. 📊 Revisar turnos pendientes
4. 👨‍⚕️ Asignar profesionales a cada turno
5. 🎛️ Gestionar reasignaciones y rechazos


🛡️ Seguridad y Protección de Rutas
Característica	Descripción	Icono
Rutas Protegidas	Cada usuario solo accede a sus dashboards	🔒
Validación de Sesiones	Verificación de autenticación	✅
Redirecciones Automáticas	Usuarios logueados van a sus dashboards	🔄
💾 Almacenamiento de Datos
<div align="center">
Tipo de Datos	Descripción	Icono
👥 Usuarios	Pacientes, profesionales, administradores	👨‍💼
📅 Turnos	Solicitudes y asignaciones	📋
🏥 Asignaciones	Profesionales asignados a turnos	👨‍⚕️
📊 Estados	Estados de los turnos (pendiente/aprobado/rechazado)	🎚️
</div>
Todos los datos se almacenan en 📦 localStorage del navegador

🛠️ Características Técnicas
<div align="center">
Tecnología	Descripción	Icono
⚛️ React.js	Framework principal	⚛️
🎨 Tailwind CSS	Estilos y diseño	🎨
🛣️ React Router DOM	Navegación entre páginas	🗺️
📝 React Hook Form	Manejo de formularios	📄
🔔 React Toastify	Notificaciones al usuario	💬
📱 Responsive	Adaptable a todos los dispositivos	📱
</div>
🧭 Guía de Navegación Recomendada
<div align="center">

1. 🏁 Registrar administrador en /admin/register
2. 👨‍⚕️ Registrar profesionales en /profregister  
3. 👤 Registrar pacientes en /register
4. 🔄 Probar flujo completo de turnos

</div>

📞 ¿Necesitas Ayuda?
<div align="center">
¿Tienes preguntas o necesitas asistencia con alguna funcionalidad?

https://img.icons8.com/color/96/000000/customer-support.png

¡Estoy aquí para ayudarte! 🚀

</div>
<div align="center">
✨ Desarrollado con ❤️ para la gestión médica eficiente ✨

https://img.icons8.com/color/96/000000/heart-health.png

</div>
