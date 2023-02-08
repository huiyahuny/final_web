from flask import Flask, render_template
import sqlite3

app = Flask(__name__)

@app.route('/device_usage')
def device_usage():
    conn = sqlite3.connect('ijm.db')
    c = conn.cursor()
    c.execute("SELECT * FROM 나중에테이블명변경하기")
    data = c.fetchall()
    return render_template('dashboard.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)