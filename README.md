## Kong Vue Excercise
The application is built using:
 - Vue 3 with composition api.
 - Typescript
 - Vitest
 - SCSS

### Overview
- The components are kept as loosely coupled as possible for reusability purpose.
- Every component has its corresponding test file inside the same folder
- Mock files are inside the `mocks` folder
- The icons are copied from the figma as svg.
- The default `max-width: 1366px;` set to `.service-catalog` is now added to `main` tag & modified to `max-width: 100vw;` for consistent look & feel across different operating systems.
- The lib folder has `utils` & `constants` ts files to segregate reusable logic
- The types folder has typescript types & interfaces.
- The styles folder has a partial called `_variables.scss` which has defined variables for further usage across the application & `common.scss` styles within it.

Every step mentioned in the GitHub README (https://github.com/Kong/konnect-team-interview-frontend-exercise) for project setup & commits has been followed, ensuring that the setup and usage guidelines are adhered to throughout the project.

### Additional Requirements 
- Added refresh button that appears every 10 seconds (added specifically to accomodate the requirement asked during Panel 1 interview).
- Debouncing
- Responsive
