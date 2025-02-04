# Transform Matrix CSS Editor

Una herramienta web interactiva para crear y visualizar transformaciones CSS mediante matrices. Este editor ayuda a desarrolladores y diseñadores a entender y manipular las propiedades de transformación CSS de manera visual e intuitiva.

![Transform Matrix Editor Demo](./public/demo.png)

## Características

- Editor visual para matrices de transformación CSS
- Vista previa en tiempo real de las transformaciones
- Interfaz intuitiva para ajustar valores de transformación
- Código CSS listo para copiar y pegar
- Soporte para operaciones comunes de transformación:
  - Escala (Scale)
  - Rotación (Rotate)
  - Traslación (Translate)
  - Sesgo (Skew)

## Inicio Rápido

### Prerrequisitos

- Node.js (v14 o superior)
- npm (viene con Node.js)

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/yourusername/transform-matrix-css-editor.git
cd transform-matrix-css-editor
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm start
```

La aplicación se abrirá automáticamente en tu navegador predeterminado en [http://localhost:3000](http://localhost:3000).

## Cómo Usar

1. **Ajuste de Transformaciones**
   - Usa los deslizadores para ajustar los valores de transformación
   - Observa los cambios en tiempo real en la vista previa
   - Los valores se actualizan automáticamente en el código CSS

2. **Valores de la Matriz**
   - **Scale X (a)**: Escala horizontal (-3 a 3)
   - **Skew Y (b)**: Sesgo vertical (-5 a 5)
   - **Skew X (c)**: Sesgo horizontal (-5 a 5)
   - **Scale Y (d)**: Escala vertical (-3 a 3)
   - **Translate X**: Traslación horizontal (-150px a 150px)
   - **Translate Y**: Traslación vertical (-150px a 150px)

3. **Copiar Código CSS**
   - El código CSS generado incluye prefijos de navegador (-webkit, -ms)
   - Usa el botón "Copy CSS" para copiar el código al portapapeles

## Tecnologías Utilizadas

- React - Framework de frontend
- Create React App - Configuración del proyecto
- CSS Modules - Estilos

## Contribuir

Contribuciones son bienvenidas! Sigue estos pasos:

1. Haz fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add: nueva característica'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Convenciones de Código

- Usa nombres descriptivos para variables y funciones
- Sigue las convenciones de React para componentes
- Mantén el código limpio y bien documentado
- Usa comentarios JSDoc para funciones importantes

## Estructura del Proyecto

```
transform-matrix-css-editor/
├── src/
│   ├── components/
│   │   ├── Matrix.js       # Componente principal del editor
│   │   └── Slider.js       # Componente de deslizador
│   ├── EditableTag.js      # Estilos y componentes styled-components
│   └── App.js             # Componente raíz
├── public/
│   └── index.html
└── package.json
```

## Referencias

- [CSS Transform Matrix](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix)
- [Understanding CSS Transforms](https://www.w3.org/TR/css-transforms-1/)

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Agradecimientos

- Gracias al equipo de Create React App por el scaffolding inicial
- Inspirado en la necesidad de una mejor herramienta de visualización de transformaciones CSS
- Comunidad de desarrolladores por su feedback y sugerencias
