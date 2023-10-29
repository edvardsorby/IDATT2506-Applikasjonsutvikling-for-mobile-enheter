package no.ntnu.idatt2506.oeving7.managers

import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import no.ntnu.idatt2506.oeving7.service.Database
import java.io.BufferedReader
import java.io.File
import java.io.FileReader
import java.io.IOException
import java.io.InputStream
import java.io.InputStreamReader
import java.io.PrintWriter

class FileManager(private val activity: AppCompatActivity, private val db: Database) {

    private val filename: String = "movies.txt"

    private var dir: File = activity.filesDir
    private var file: File = File(dir, filename)

    private var externalDir: File? = activity.getExternalFilesDir(null)
    private var externalFile = File(externalDir, filename)


    fun write(str: String) {
        PrintWriter(file).use { writer ->
            writer.println(str)
        }
    }

    fun readLine(): String? {
        BufferedReader(FileReader(file)).use { reader ->
            return reader.readLine()
        }
    }

    /**
     * Open file: *res/raw/id.txt*
     *
     * @param fileId R.raw.filename
     */
    fun readFileFromResFolder(fileId: Int): String {
        val content = StringBuffer("")
        try {
            val inputStream: InputStream = activity.resources.openRawResource(fileId)
            val reader = BufferedReader(InputStreamReader(inputStream)).use { reader ->
                var line = reader.readLine()
                while (line != null) {
                    content.append(line)
                    content.append("\n")

                    val array = line.split(",")

                    for (i in 2..<array.size) {
                        db.insert(array[0].trim(), array[1].trim(), array[i].trim())
                    }

                    line = reader.readLine()
                }

            }
        } catch (e: IOException) {
            e.printStackTrace()
        }
        Log.i("readFileFromResFolder()", content.toString())
        return content.toString()
    }

    fun writeMoviesToFile() {

        val movies: ArrayList<String> = db.allMovies

        var str = ""

        for (movie in movies) {
            str += movie + "\n"
        }

        write(str)
    }
}