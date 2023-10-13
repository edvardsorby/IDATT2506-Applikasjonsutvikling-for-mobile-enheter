package no.ntnu.idatt2506.oeving3

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.DatePicker
import android.widget.TextView

class EditFriendActivity : Activity() {
    private var index = 0
    private var name = ""
    private var bday = ""
    private lateinit var datePicker: DatePicker


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_edit_friend)

        index = intent.getIntExtra("index", 0)
        name = intent.getStringExtra("name").toString()
        bday = intent.getStringExtra("bday").toString()

        (findViewById<TextView>(R.id.editTextText)).text = name

        datePicker = findViewById<DatePicker>(R.id.datePicker)


        val date = bday.split(".")
        val day = date[0].toInt()
        val month = date[1].toInt()-1
        val year = date[2].toInt()

        datePicker.updateDate(year, month, day)

        initBackButton()
        initSaveButton()
    }

    private fun save() {
        val newName: String = (findViewById<TextView>(R.id.editTextText)).text.toString()

        val day: Int = datePicker.dayOfMonth
        val month: Int = datePicker.month+1
        val year: Int = datePicker.year

        val newBday = "$day.$month.$year"

        setResult(RESULT_OK, Intent().putExtra("index", index).putExtra("newName", newName).putExtra("newBday", newBday))
        finish()
    }

    private fun cancel() {
        setResult(RESULT_OK, Intent().putExtra("index", index).putExtra("newName", name).putExtra("newBday", bday))
        finish()
    }

    private fun initBackButton() {
        val button = findViewById<Button>(R.id.button3)

        button.setOnClickListener { cancel() }
    }

    private fun initSaveButton() {
        val button = findViewById<Button>(R.id.button2)
        button.setOnClickListener { save() }
    }


    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        cancel()
    }
}