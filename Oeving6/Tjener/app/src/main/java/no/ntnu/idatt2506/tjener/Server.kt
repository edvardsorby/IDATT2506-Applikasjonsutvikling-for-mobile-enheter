package no.ntnu.idatt2506.tjener

import android.util.Log
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.io.PrintWriter
import java.net.ServerSocket
import java.net.Socket

class Server(
    private val activity: MainActivity,
    private val PORT: Int = 12345,
    private val sockets: MutableList<Socket> = mutableListOf()
) {

    fun start(receivedCallback: (message: String) -> Unit, dialogCallback: (message: String) -> Unit) {
        CoroutineScope(Dispatchers.IO).launch {
            try {

                receivedCallback("Starter Tjener ...")
                ServerSocket(PORT).use { serverSocket: ServerSocket ->

                    receivedCallback("ServerSocket opprettet, venter på at en klient kobler seg til....")

                    while (true) {
                        // Vent på ny forbindelse
                        Log.i("accept()", "waiting")
                        val clientSocket = serverSocket.accept()
                        sockets.add(clientSocket)

                        Log.i("accept()", clientSocket.toString())

                        // Start ny tråd eller coroutine for klienten
                        ClientHandler(clientSocket, activity).start(receivedCallback, ::broadcastMessage)
                        Log.i("accept()", "handled")


                    }
                }
            } catch (e: Exception) {
                e.printStackTrace()
                dialogCallback(e.message!!)
            }
        }
    }

    private fun broadcastMessage(message: String) {

        Log.i("broadcastMessage", sockets.size.toString())

        for (socket in sockets) {
            CoroutineScope(Dispatchers.IO).launch {
                val writer = PrintWriter(socket.getOutputStream(), true)
                writer.println(message)
            }
        }
    }
}
