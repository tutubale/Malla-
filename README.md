# Malla Interactiva de Kinesiología PUCV

Este proyecto es una malla universitaria interactiva para la carrera de Kinesiología en la PUCV, diseñada para usarse en dispositivos como tablets.  

## Características

- La malla está organizada por 5 años, cada año con 2 semestres.  
- Cada ramo (curso) está representado en un recuadro redondeado con color según su estado:  
  - **Lila**: Aprobado  
  - **Rosado**: Reprobado  
  - **Celeste**: Actualmente cursando / disponible para cursar  
  - **Gris**: No disponible (prerrequisitos no aprobados)  
- Los prerrequisitos se controlan automáticamente.  
- Puedes hacer clic en cada ramo para cambiar su estado:  
  - De bloqueado → disponible → aprobado → reprobado → bloqueado.  
- El estado se guarda automáticamente en el navegador para continuar donde lo dejaste.  
- Puedes desbloquear manualmente un ramo marcado como bloqueado si fue por error.  
- Los ciclos de asignaturas electivas se pueden repetir.  

## Cómo usarlo

1. Clona o descarga este repositorio.  
2. Abre el archivo `index.html` en tu navegador (idealmente en tu tablet).  
3. Haz clic en los ramos para cambiar su estado y gestionar tu avance.  
4. El progreso se guarda automáticamente usando `localStorage`.  

## Estructura de archivos

- `index.html`: estructura y contenido de la malla.  
- `styles.css`: estilos para colores y diseño.  
- `script.js`: lógica para manejo de estados, prerrequisitos y almacenamiento.  

## Cómo contribuir

Si quieres mejorar la malla, agregar más funcionalidades o corregir errores, puedes hacer un fork y enviar pull requests.  

## Licencia

Proyecto para uso personal y académico.  

---

Creado por [tutubale](https://github.com/tutubale).
