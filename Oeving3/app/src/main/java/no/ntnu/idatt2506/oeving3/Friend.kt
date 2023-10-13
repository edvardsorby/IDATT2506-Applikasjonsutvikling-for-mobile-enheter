package no.ntnu.idatt2506.oeving3

class Friend(
    var name: String,
    var bday: String,
) {

    override fun toString(): String {
        return "$name (f. $bday)"
    }
}