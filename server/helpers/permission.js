const pool = require('../database/connection')


const uploadProductPermission = (userId) => {
    try {
        const sql = `SELECT role FROM users WHERE id = ? `;
        const [result] = pool.execute(sql, [userId]);
        if (result.length > 0 && result[0].role === 'ADMIN') {
            return true; 
        }
        return false;
    } catch (error) {
        console.error('Error checking user role:', error);
        throw new Error('Could not check user role');
    }
};

module.exports = uploadProductPermission;
