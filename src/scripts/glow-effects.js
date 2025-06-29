// Glow effects script - handles random positioning for neuro-glow-effect
export function initializeGlowEffects() {
	const glowElement = document.querySelector('.neuro-glow-effect');
	if (glowElement) {
		function updateRandomPosition() {
			glowElement.style.setProperty('--random-x', Math.random());
			glowElement.style.setProperty('--random-y', Math.random());
		}
		
		// Set initial position
		updateRandomPosition();
		
		// Listen for animation iteration to sync with the pulse cycle
		glowElement.addEventListener('animationiteration', updateRandomPosition);
	}
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGlowEffects);