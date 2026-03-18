const fs = require('fs');
const path = require('path');

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

            // Normalize "Edit2" to "Edit" because Staff module uses "Edit"
            updated = updated.replace(/<Edit2/g, '<Edit');
            
            // Also need to ensure "Edit" is imported instead of "Edit2", and "Trash2" is imported instead of "Trash" if they were not
            if (updated.includes('<Edit ') && !updated.includes('Edit,')) {
                updated = updated.replace(/Edit2,/g, 'Edit,');
                if (updated.includes('Edit2 }')) updated = updated.replace(/Edit2 }/g, 'Edit }');
            }

            // Replace `<Eye className="..." size="..." />` etc to precisely `<Eye size={18} className="ms" />` when inside buttons
            // But we can just aggressively normalize them:
            updated = updated.replace(/<Eye\s+size=\{[0-9]+\}\s*(?:className="[^"]*")?\s*\/>/g, '<Eye size={18} className="ms" />');
            updated = updated.replace(/<Edit\s+size=\{[0-9]+\}\s*(?:className="[^"]*")?\s*\/>/g, '<Edit size={18} className="ms" />');
            updated = updated.replace(/<Trash2?\s+size=\{[0-9]+\}\s*(?:className="[^"]*")?\s*\/>/g, '<Trash2 size={18} className="ms" />');
            
            // Also Fix `Trash` to `Trash2`
            updated = updated.replace(/Trash,/g, 'Trash2,');
            
            // Any other weird anomalies with View/Edit/Delete
            
            if (content !== updated) {
                fs.writeFileSync(fullPath, updated, 'utf8');
                console.log('Updated ' + file);
            }
        }
    }
}
traverse(dir);
