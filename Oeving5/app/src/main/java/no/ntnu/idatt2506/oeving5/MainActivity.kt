package no.ntnu.idatt2506.oeving5

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch

const val URL = "https://bigdata.idi.ntnu.no/mobil/tallspill.jsp"

class MainActivity : AppCompatActivity() {

    private val network: HttpWrapper = HttpWrapper(URL)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        initSaveButton()
        initPlayButton()
    }

    private fun initSaveButton() {
        val button = findViewById<Button>(R.id.save)
        button.setOnClickListener { save() }
    }

    private fun save() {
        performRequest(HTTP.GET, requestParameters("save"))
    }

    private fun initPlayButton() {
        val button = findViewById<Button>(R.id.play)
        button.setOnClickListener { play() }
    }

    private fun play() {
        performRequest(HTTP.GET, requestParameters("play"))
    }

    /**
     * Utfør en HTTP-forespørsel separat fra hovedtråden
     */
    private fun performRequest(typeOfRequest: HTTP, parameterList: Map<String, String>) {
        CoroutineScope(Dispatchers.IO).launch {
            val response: String = try {
                Log.i("performRequest()", typeOfRequest.toString())
                Log.i("performRequest()", parameterList.toString())
                when (typeOfRequest) {
                    HTTP.GET -> network.get(parameterList)
                    HTTP.POST -> network.post(parameterList)
                    HTTP.GET_WITH_HEADER -> network.getWithHeader(parameterList)
                }
            } catch (e: Exception) {
                Log.e("performRequest()", e.message!!)
                e.toString()
            }

            // Endre UI på hovedtråden
            MainScope().launch {
                setResult(response)
                Log.i("performRequest()", response)
                //setResult(formatJsonString(response))
            }
        }
    }

    /**
     * Show result from server in UI
     */
    private fun setResult(response: String?) {
        findViewById<TextView>(R.id.result).text = response!!.trim()
    }

    /**
     * Create a map with parameters for HTTP requests
     */
    private fun requestParameters(button: String): Map<String, String> {
        when (button) {
            "save" -> {
                val name = findViewById<EditText>(R.id.name).text.toString()
                val card = findViewById<EditText>(R.id.card).text.toString()
                return mapOf(
                    "navn" to name,
                    "kortnummer" to card,
                )
            }
            "play" -> {
                val number = findViewById<EditText>(R.id.number).text.toString()
                return mapOf(
                    "tall" to number,
                )
            }
            else -> return mapOf()
        }
    }

}