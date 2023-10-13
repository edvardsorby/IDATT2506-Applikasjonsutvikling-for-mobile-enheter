package no.ntnu.idatt2506.oeving1

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuItem

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    override fun onCreateOptionsMenu(meny: Menu): Boolean{
        super.onCreateOptionsMenu(meny)
        meny.add("Edvard")
        meny.add("Sørby")
        Log.d("IDATT2506","meny laget")
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean{
        if (item.title!!.equals("Edvard")){
            Log.w("IDATT2506","Edvard")
        } else if (item.title!!.equals("Sørby")){
            Log.e("IDATT2506","Sørby")
        }
        return true
    }
}