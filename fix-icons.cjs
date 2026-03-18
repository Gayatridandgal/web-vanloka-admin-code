const fs = require('fs');
const path = require('path');
const targetIcons = ['Eye', 'Edit', 'Trash2', 'Trash', 'ToggleLeft', 'ToggleRight', 'RefreshCw', 'FileDown', 'ArrowLeft', 'Plus', 'MailCheck'];
const dir = path.join(process.cwd(), 'src/pages');

function traverse(dir) {
    let files = fs.readdirSync(dir);
    for (let file of files) {
        let fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverse(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = content;
            
            // Fix sizes from whatever to 18 for action icons, ensuring className='ms' is present if needed.
            targetIcons.forEach(icon => {
                // First pass: replace those without className
                const regexNoClass = new RegExp('<' + icon + '\\s+size=\\{[0-9]+\\}\\s*/>', 'g');
                updated = updated.replace(regexNoClass, '<' + icon + ' size={18} className="ms" />');

                // Second pass: replace those with className
                const regexWithClass = new RegExp('<' + icon + '\\s+size=\\{[0-9]+\\}\\s+className="([^"]+)"\\s*/>', 'g');
                updated = updated.replace(regexWithClass, (match, className) => {
                    let newClass = className || '';
                    if (!newClass.includes('ms')) newClass = 'ms ' + newClass;
                    newClass = newClass.trim();
                    return '<' + icon + ' size={18} className="' + newClass + '" />';
                });

                // Third pass: For cases where other props exist (e.g. style or inside button), just enforce size={18} if it was 14/16
                const fallbackRegex = new RegExp('<' + icon + '\\s+size=\\{(14|16)\\}(\\s|>)', 'g');
                updated = updated.replace(fallbackRegex, '<' + icon + ' size={18}$2');
            });

            // Make sure Users, MapPin, Search usually match Staff
            updated = updated.replace(/<Users\s+size=\{1[46]\}\s*\/>/g, '<Users size={18} className="ms" />');
            updated = updated.replace(/<Search\s+size=\{1[46]\}/g, '<Search size={18}');
            
            // Specifically change all Edit/Eye/Trash2 inside `table` layout to be size=18 and className="ms"
            // And things like <Plus size={18} /> should be <Plus size={18} className="ms mr-1" />
            
            if (content !== updated) {
                fs.writeFileSync(fullPath, updated, 'utf8');
                console.log('Updated ' + file);
            }
        }
    }
}
traverse(dir);
