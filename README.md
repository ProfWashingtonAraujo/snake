# 🐍 Snake Premium Arcade

A modern, high-performance, and visually stunning implementation of the classic Snake game. Built with a premium arcade aesthetic, featuring neon effects, glassmorphism, and responsive controls.

![Snake Premium Arcade Preview](https://via.placeholder.com/1200x630/0a0a0f/00f3ff?text=Snake+Premium+Arcade) *<!-- Replace with actual screenshot after deployment -->*

## 🚀 Features

- **Premium UI/UX**: Sleek dark mode with neon accents and smooth animations.
- **Responsive Design**: Playable on Desktop, Tablet, and Mobile.
- **Multiple Difficulties**: Choose between Easy, Medium, and Hard modes.
- **Local Ranking**: Save your best scores and compete with friends locally.
- **Advanced Controls**:
  - Desktop: WASD / Arrow Keys + Space to Pause.
  - Mobile: On-screen d-pad and Swipe gestures.
- **Performance Optimized**: Built with Vite and Framer Motion for buttery smooth 60 FPS gameplay.
- **Automated Deployment**: GitHub Actions ready for one-click publishing.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Deployment**: GitHub Pages via GitHub Actions

## 📂 Project Structure

```text
src/
  components/     # UI Components (GameBoard, ScorePanel, etc.)
  hooks/          # Custom hooks (useSnakeGame for core logic)
  utils/          # Helper functions (game rules, ranking logic)
  data/           # Constants and configuration
  App.jsx         # Main application assembly
  index.css       # Global styles and tailwind directives
```

## 🏃 Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/snake-premium-arcade.git
   cd snake-premium-arcade
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🚢 Deployment

The project is configured for **GitHub Pages**.

1. Update the `base` property in `vite.config.js` to match your repository name:
   ```js
   base: '/snake-premium-arcade/'
   ```
2. Push to the `main` branch.
3. The GitHub Action in `.github/workflows/deploy.yml` will automatically build and deploy the site.

## 🔮 Future Improvements

- [ ] Global Leaderboard (Firebase/Supabase integration).
- [ ] Multiple game modes (Classic, No Walls, Obstacles).
- [ ] Unlockable snake skins.
- [ ] Sound effects and background music.
- [ ] PWA support for offline play.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Developed with ❤️ as a premium portfolio project.
