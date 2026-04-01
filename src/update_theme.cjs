const fs = require('fs');
const path = require('path');

const appPath = path.join('d:/PROJETOS/Metal-Mach/src/App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');

// Colors
appContent = appContent.replace(/text-gray-900/g, 'text-white');
appContent = appContent.replace(/bg-white/g, 'bg-[#0A0A0A] border border-[#333]');
appContent = appContent.replace(/bg-\[\#F8F9FA\]/g, 'bg-[#000000]');
appContent = appContent.replace(/bg-gray-50/g, 'bg-[#111111] border border-[#222]');
appContent = appContent.replace(/bg-gray-100/g, 'bg-[#1A1A1A]');
appContent = appContent.replace(/bg-gray-900/g, 'bg-[#050505] border-t border-[#333]');
appContent = appContent.replace(/text-gray-800/g, 'text-[#F7F6F5]');
appContent = appContent.replace(/text-gray-700/g, 'text-[#E0E0E0]');
appContent = appContent.replace(/text-gray-600/g, 'text-[#CCCCCC]');
appContent = appContent.replace(/text-gray-500/g, 'text-[#999999]');
appContent = appContent.replace(/text-gray-400/g, 'text-[#666666]');
appContent = appContent.replace(/text-\[\#1A1A1A\]/g, 'text-[#F7F6F5]');
appContent = appContent.replace(/text-gray-300/g, 'text-[#999]');

// Oranges
appContent = appContent.replace(/blue-600/g, '[#E35205]');
appContent = appContent.replace(/blue-700/g, '[#C24503]');
appContent = appContent.replace(/blue-500/g, '[#FF6B1A]');
appContent = appContent.replace(/blue-400/g, '[#FF8A47]');
appContent = appContent.replace(/blue-300/g, '[#FF9557]');
appContent = appContent.replace(/blue-200/g, '[#FFB185]');
appContent = appContent.replace(/blue-100/g, '[#2A1001]');
appContent = appContent.replace(/blue-50/g, '[#140700]');

// Also fix some specific bg-white/x that got messed up by the global replacement
appContent = appContent.replace(/bg-\[\#0A0A0A\] border border-\[\#333\]\//g, 'bg-white/');

fs.writeFileSync(appPath, appContent);

const cssPath = path.join('d:/PROJETOS/Metal-Mach/src/index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');

cssContent = cssContent.replace(/rgba\(37, 99, 235/g, 'rgba(227, 82, 5');
cssContent = cssContent.replace(/#2563eb/g, '#E35205');
cssContent = cssContent.replace(/#1d4ed8/g, '#C24503');
cssContent = cssContent.replace(/#3b82f6/g, '#FF6B1A');
cssContent = cssContent.replace(/#60a5fa/g, '#FF8A47');

cssContent = cssContent.replace(/rgba\(147, 197, 253, 0.35\)/g, 'rgba(227, 82, 5, 0.15)');
cssContent = cssContent.replace(/rgba\(96, 165, 250, 0.1\)/g, 'rgba(255, 107, 26, 0.05)');
cssContent = cssContent.replace(/rgba\(226, 232, 240, 0.5\)/g, 'rgba(227, 82, 5, 0.05)');
cssContent = cssContent.replace(/rgba\(255, 255, 255, 0.88\)/g, 'rgba(5, 5, 5, 0.88)');
cssContent = cssContent.replace(/rgba\(229, 231, 235, 0.8\)/g, 'rgba(51, 51, 51, 0.8)');
cssContent = cssContent.replace(/rgba\(255, 255, 255, 0.1\)/g, 'rgba(25, 25, 25, 0.4)');

cssContent = cssContent.replace(/background: #f1f5f9;/g, 'background: #111;');
cssContent = cssContent.replace(/background: #cbd5e1;/g, 'background: #333;');

fs.writeFileSync(cssPath, cssContent);
console.log("Theme updated successfully on App.tsx and index.css.");
