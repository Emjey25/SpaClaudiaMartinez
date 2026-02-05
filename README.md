

# 🌸 Sistema de Gestión para Spa - Claudia Martínez

## 📋 Descripción

Sistema integral de gestión diseñado específicamente para spas y centros de belleza. Permite administrar clientes, citas, inventario y contabilidad de manera eficiente y profesional.

## ✨ Características Principales

### 👥 Gestión de Clientes
- Registro completo de información personal y contacto
- Historial clínico detallado con datos de piel
- Sistema de clasificación VIP
- Alergias y áreas tratadas
- Seguimiento de última visita

### 📅 Agenda de Citas
- Calendario interactivo para programar citas
- Estados de citas: Pendiente, Confirmada, Completada, Cancelada
- Asignación automática de servicios
- Vista organizada por horarios

### 📦 Control de Inventario
- Gestión de productos y stock
- Alertas de stock mínimo
- Registro de precios y unidades
- Actualización en tiempo real

### 💰 Contabilidad
- Registro de ingresos y gastos
- Gráficos de flujo de caja
- Resumen financiero mensual
- Historial de transacciones

### 📊 Dashboard Analítico
- Métricas clave del negocio
- Gráficos de ingresos mensuales
- Indicadores de rendimiento
- Vista general del estado del spa

## 🚀 Instalación y Configuración

### Requisitos Previos
- **Node.js** (versión 16 o superior)
- **npm** o **yarn**
- Navegador web moderno

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Emjey25/SpaClaudiaMartinez.git
   cd claudia-martínez-spa-manager
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:
   ```env
   VITE_AI_SERVICE_API_KEY=tu_clave_api_aqui
   ```

4. **Ejecutar la aplicación en modo desarrollo**
   ```bash
   npm run dev
   ```

5. **Acceder a la aplicación**
   
   Abre tu navegador en `http://localhost:3000`

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera la versión de producción
- `npm run preview` - Previsualiza la versión de producción

## 🏗️ Tecnologías Utilizadas

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Lucide React** - Iconos
- **Recharts** - Gráficos y visualizaciones
- **Tailwind CSS** - Estilos (configurado con clases personalizadas)

## 📁 Estructura del Proyecto

```
claudia-martínez-spa-manager/
├── components/
│   ├── Accounting.tsx      # Módulo de contabilidad
│   ├── Agenda.tsx          # Gestión de citas
│   ├── Clients.tsx         # Gestión de clientes
│   ├── Dashboard.tsx       # Panel principal
│   ├── Inventory.tsx       # Control de inventario
│   ├── Logo.tsx            # Componente del logo
│   └── Sidebar.tsx         # Navegación lateral
├── App.tsx                 # Componente principal
├── types.ts                # Definiciones de TypeScript
├── index.tsx               # Punto de entrada
├── vite.config.ts          # Configuración de Vite
├── tsconfig.json           # Configuración de TypeScript
└── package.json            # Dependencias del proyecto
```

## 🎨 Personalización

La aplicación utiliza una paleta de colores personalizados definida en el tema "spa":
- **spa-50** a **spa-900**: Tonos de rosa elegantes
- Tipografía serif para un look sofisticado
- Diseño responsive y moderno

## 🔐 Seguridad

- Las claves API se almacenan en variables de entorno
- No se incluyen datos sensibles en el control de versiones
- Archivo `.env.local` debe ser añadido a `.gitignore`

## 📝 Notas Importantes

- Los datos de ejemplo se cargan automáticamente al iniciar la aplicación
- La información se almacena en el estado local (sin persistencia en base de datos por defecto)
- Para producción, se recomienda implementar un backend con base de datos

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

## 📄 Licencia

Este proyecto es privado y pertenece a Claudia Martínez Spa.

## 👤 Autor

**Claudia Martínez**
- GitHub: [@Emjey25](https://github.com/Emjey25)

## 📞 Soporte

Para soporte o preguntas, por favor contacta al equipo de desarrollo.

---

<div align="center">
  <p>Hecho con ❤️ para el bienestar y la belleza</p>
</div>
