export default function logErrorInDevMode(error: Error): void {
  if (import.meta.env.MODE === 'development') {
    console.error(error);
  }
}
