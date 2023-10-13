package no.ntnu.idatt2506.oppgave1

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.TextView

class MainActivity : Activity() {
    private val numberRequestCode: Int = 1
    private var numberValue: Int = 0
    private val limit: Int = 50

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    fun onClickStartGenerateNumberActivity(v: View?) {
        val intent = Intent(".GenerateNumberActivity")
        intent.putExtra("limit", limit)
        startActivityForResult(intent, numberRequestCode)
    }

    public override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {
        if (resultCode != RESULT_OK) {
            Log.e("onActivityResult()", "Noe gikk galt")
            return
        }
        if (requestCode == numberRequestCode) {

            numberValue = data.getIntExtra("number", numberValue)
            val number = findViewById<View>(R.id.textView) as TextView
            number.text = numberValue.toString()
        }
    }
}