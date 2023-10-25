package no.ntnu.idatt2506.klient

import android.app.AlertDialog
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import java.io.BufferedReader
import java.io.InputStreamReader
import java.io.PrintWriter
import java.net.Socket

class Client(
    private val activity: MainActivity,
    private var textViewSent: TextView = activity.findViewById(R.id.sent),
    private var editText: EditText = activity.findViewById(R.id.editText),
    private var button: Button = activity.findViewById(R.id.button),
    //private val SERVER_IP: String = "10.0.2.2", // Emulator loopback
    private val SERVER_IP: String = "10.0.0.33", // Physical device
    private val SERVER_PORT: Int = 12345,
) {
    private lateinit var setReceivedCallback: (message: String) -> Unit
    private lateinit var broadcastCallback: (message: String) -> Unit

    fun start(callback: (message: String) -> Unit, broadcast: (message: String) -> Unit) {
        CoroutineScope(Dispatchers.IO).launch {

            setReceivedCallback = callback
            broadcastCallback = broadcast

            setReceivedCallback("Kobler til tjener...")
            try {
                Socket(SERVER_IP, SERVER_PORT).use { socket: Socket ->
                    initButton(socket)
                    setReceivedCallback("Koblet til tjener:\n$socket")

                    Log.e("Koblet til tjener", socket.toString())

                    while (true) {
                        readFromServer(socket)
                    }

                }
            } catch (e: Exception) {
                e.printStackTrace()
                showDialog(e.message!!)
            }
        }
    }
    private fun readFromServer(socket: Socket) {
        val reader = BufferedReader(InputStreamReader(socket.getInputStream()))
        val message = reader.readLine()
        setReceivedCallback(message)
    }
    private fun sendToServer(socket: Socket, message: String) {
        val writer = PrintWriter(socket.getOutputStream(), true)
        writer.println(message)
        setSent(message)
    }


    private fun setSent(str: String){
        MainScope().launch { textViewSent.text = str }
    }


    private fun showDialog(str: String) {
        MainScope().launch {

            val builder = AlertDialog.Builder(activity)
            builder
                .setTitle("Error")
                .setMessage(str)
                .setPositiveButton("OK") { dialog, which -> }

            builder.show()
        }
    }

    private fun initButton(socket : Socket) {
        button.setOnClickListener { sendMessage(socket) }
        MainScope().launch { button.isEnabled = true }
    }

    private fun sendMessage(socket: Socket) {
        Log.i("sendMessage()", socket.toString())
        val deviceName = android.os.Build.MODEL
        val message = "$deviceName: " + editText.text.toString()
        MainScope().launch { editText.setText("") }

        CoroutineScope(Dispatchers.IO).launch {
            sendToServer(socket, message)
        }

    }
}
