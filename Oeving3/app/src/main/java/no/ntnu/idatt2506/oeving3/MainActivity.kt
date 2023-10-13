package no.ntnu.idatt2506.oeving3

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.ListView
import android.widget.AdapterView.OnItemClickListener


class MainActivity : Activity() {
    private var friends: MutableList<Friend> = mutableListOf()
    private val addFriendsRequestCode: Int = 1
    private val editFriendRequestCode: Int = 2

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        addSampleData()

        initAddFriendsButton()
        initList()
    }

    private fun initAddFriendsButton() {
        val button = findViewById<Button>(R.id.button)
        button.setOnClickListener { addFriends() }
    }

    private fun addFriends() {
        val intent = Intent(".LeggTilVennerActivity")
        startActivityForResult(intent, addFriendsRequestCode)
    }

    private fun initList() {
        val adapter = ArrayAdapter(this, android.R.layout.simple_list_item_activated_1, friends)
        val listView = findViewById<ListView>(R.id.listView)
        listView.adapter = adapter
        listView.choiceMode = ListView.CHOICE_MODE_SINGLE

        listView.onItemClickListener =
             OnItemClickListener { parent: AdapterView<*>?, valgt: View, posisjon: Int, id: Long ->

                 editFriend(posisjon)
            }
    }

    public override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent) {

        if (resultCode != RESULT_OK) {
            Log.e("onActivityResult()", "Noe gikk galt")
            return
        }

        if (requestCode == addFriendsRequestCode) {
            val newFriend: String = data.getStringExtra("newFriend").toString()
            val newFriendBday: String = data.getStringExtra("bday").toString()

            println(newFriend)

            friends.add(Friend(newFriend, newFriendBday))

        } else if (requestCode == editFriendRequestCode) {


            val index: Int = data.getIntExtra("index", 0)
            val newName: String = data.getStringExtra("newName").toString()
            val newBday: String = data.getStringExtra("newBday").toString()

            friends[index].name = newName
            friends[index].bday = newBday

        }
        initList()
    }

    private fun editFriend(index: Int) {
        val intent = Intent(".EditFriendActivity")
            .putExtra("index", index)
            .putExtra("name", friends[index].name)
            .putExtra("bday", friends[index].bday)

        startActivityForResult(intent, editFriendRequestCode)
    }

    private fun addSampleData() {
        val friendNames = resources.getStringArray(R.array.friendnames).toMutableList()
        val friendBdays = resources.getStringArray(R.array.friendbdays).toMutableList()

        for (i in resources.getStringArray(R.array.friendnames).indices) {
            friends.add(Friend(friendNames[i], friendBdays[i]))
        }
    }

}