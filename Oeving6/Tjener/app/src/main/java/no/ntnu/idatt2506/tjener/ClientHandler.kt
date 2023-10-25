package no.ntnu.idatt2506.tjener

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

class ClientHandler(
    private val clientSocket: Socket,
    private val activity: MainActivity,
    private var textViewSent: TextView = activity.findViewById(R.id.sent),
    private var editText: EditText = activity.findViewById(R.id.editText),
    private var button: Button = activity.findViewById(R.id.button)
) {
    private lateinit var setReceivedCallback: (message: String) -> Unit
    private lateinit var broadcastCallback: (message: String) -> Unit

    fun start(callback: (message: String) -> Unit, broadcast: (message: String) -> Unit) {
        CoroutineScope(Dispatchers.IO).launch {

            setReceivedCallback = callback
            broadcastCallback = broadcast

            initButton()
            setReceivedCallback("En Klient koblet seg til:\n$clientSocket")

            Log.i("start()", clientSocket.toString())
            while (true) {
                Log.i("ClientHandler", "readFromClient: $clientSocket")
                readFromClient(clientSocket)
            }
        }
    }

    private fun readFromClient(socket: Socket) {
        val reader = BufferedReader(InputStreamReader(socket.getInputStream()))
        val message = reader.readLine()
        Log.i("readFromClient()", message)

        broadcastCallback(message)

        setReceivedCallback(message)
    }

    private fun setSent(str: String){
        MainScope().launch { textViewSent.text =  str }
    }

    private fun initButton() {
        button.setOnClickListener { sendMessage() }
        MainScope().launch { button.isEnabled = true }
    }

    private fun sendMessage() {
        val deviceName = android.os.Build.MODEL
        val message = "$deviceName: " + editText.text.toString()
        MainScope().launch { editText.setText("") }
        CoroutineScope(Dispatchers.IO).launch {
            broadcastCallback(message)
            setSent(message)
        }
    }

}