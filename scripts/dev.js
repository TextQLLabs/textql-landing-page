import browserSync from 'browser-sync';
import nodemon from 'nodemon';
import { exec } from 'child_process';

const bs = browserSync.create();

// First build
exec('npm run build', (error) => {
  if (error) {
    console.error(`Error during initial build: ${error}`);
    return;
  }

  // Start browser-sync after initial build
  bs.init({
    server: 'build/client',
    single: true
  });

  // Watch for changes and rebuild
  nodemon({
    watch: ['src'],
    ext: 'ts,tsx,css,md,json',
    exec: 'npm run build && browser-sync reload'
  });
}); 