package no.ntnu.idatt2506.oppgave1

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast

class GenerateNumberActivity : Activity() {
    private var value = 0
    private var limit = 100

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_generate_number)

        limit = intent.getIntExtra("limit", limit)

        value = (0..limit).random()
        //Toast.makeText(this, value.toString(), Toast.LENGTH_LONG).show()
    }

    fun onClickAvsluttAktivitet(v: View?) {
        println(value)
        setResult(RESULT_OK, Intent().putExtra("number", value))
        finish()
    }

}