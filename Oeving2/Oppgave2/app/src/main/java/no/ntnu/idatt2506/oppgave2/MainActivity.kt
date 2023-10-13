package no.ntnu.idatt2506.oppgave2

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast

class MainActivity : Activity() {
    private var number1: Int = 0
    private var number2: Int = 0
    private var answer: Int = 0
    private var numberRequestCode1: Int = 1
    private var numberRequestCode2: Int = 2

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    fun onClickAdd(v: View?) {
        getNumbers()

        if (number1 + number2 == answer) {
            Toast.makeText(this, R.string.correct, Toast.LENGTH_SHORT).show()
        } else {
            val feedback = getString(R.string.wrong) + " " + (number1 + number2)

            Toast.makeText(this, feedback, Toast.LENGTH_SHORT).show()
        }
        generateNumbers()
    }

    fun onClickMultiply(v: View?) {
        getNumbers()

        if (number1 * number2 == answer) {
            Toast.makeText(this, R.string.correct, Toast.LENGTH_SHORT).show()
        } else {
            val feedback = getString(R.string.wrong) + " " + (number1 * number2)

            Toast.makeText(this, feedback, Toast.LENGTH_SHORT).show()
        }
        generateNumbers()
   }

    private fun getNumbers() {
        number1 = (findViewById<TextView>(R.id.textView1)).text.toString().toInt()
        number2 = (findViewById<TextView>(R.id.textView2)).text.toString().toInt()
        answer = (findViewById<EditText>(R.id.editText1)).text.toString().toInt()
    }

    private fun generateNumbers() {

        val intent = Intent(".GenerateNumberActivity")
        intent.putExtra("limit", findViewById<EditText>(R.id.editText2).text.toString().toInt())
        startActivityForResult(intent, numberRequestCode1)
        startActivityForResult(intent, numberRequestCode2)
    }

    public override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
        if (resultCode != RESULT_OK) {
            Log.e("onActivityResult()", "Noe gikk galt")
            return
        }
        if (requestCode == numberRequestCode1) {

            number1 = data.getIntExtra("number", number1)
            val textView1 = findViewById<View>(R.id.textView1) as TextView
            textView1.text = number1.toString()
        } else if (requestCode == numberRequestCode2) {

            number2 = data.getIntExtra("number", number2)
            val textView2 = findViewById<View>(R.id.textView2) as TextView
            textView2.text = number2.toString()
        }
    }
}