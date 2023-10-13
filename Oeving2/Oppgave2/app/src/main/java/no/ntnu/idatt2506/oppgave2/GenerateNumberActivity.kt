package no.ntnu.idatt2506.oppgave2

import android.app.Activity
import android.content.Intent
import android.os.Bundle

class GenerateNumberActivity : Activity() {
    private var value = 0
    private var limit = 100

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        limit = intent.getIntExtra("limit", limit)

        value = (0..limit).random()

        setResult(RESULT_OK, Intent().putExtra("number", value))
        finish()
    }
}