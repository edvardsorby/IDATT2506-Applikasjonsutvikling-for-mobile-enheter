package no.ntnu.idatt2506.klient

import android.app.Activity
import android.app.AlertDialog
import android.os.Bundle
import android.widget.TextView

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        Client(this).start(::setReceived, ::showDialog)
    }

    /**
     * Callback function for incoming messages
     */
    private fun setReceived(message: String) {
        findViewById<TextView>(R.id.received).text = message
    }

    /**
     * Callback function for displaying error dialogs
     */
    private fun showDialog(str: String) {
        val builder = AlertDialog.Builder(this)
        builder
            .setTitle("Error")
            .setMessage(str)
            .setPositiveButton("OK") { dialog, which -> }

        builder.show()
    }
}