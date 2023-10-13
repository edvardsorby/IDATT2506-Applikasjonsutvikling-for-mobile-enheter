package no.ntnu.idatt2506.oeving3

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.DatePicker
import android.widget.TextView

class AddFriendActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_friend)

        initBackButton()
        initAddFriendButton()
       }

    private fun addFriend() {
        val friendName: String = (findViewById<TextView>(R.id.editTextText)).text.toString()
        val datePicker = (findViewById<DatePicker>(R.id.datePicker))
        val day: Int = datePicker.dayOfMonth
        val month: Int = datePicker.month+1
        val year: Int = datePicker.year

        val friendBday = "$day.$month.$year"


        setResult(RESULT_OK, Intent().putExtra("newFriend", friendName).putExtra("bday", friendBday))
        finish()
    }

    private fun cancel() {
        setResult(RESULT_CANCELED, Intent())
        finish()
    }

    private fun initBackButton() {
        val button = findViewById<Button>(R.id.button3)
        button.setOnClickListener { cancel() }
    }

    private fun initAddFriendButton() {
        val button = findViewById<Button>(R.id.button2)
        button.setOnClickListener { addFriend() }
    }

    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        cancel()
    }
}