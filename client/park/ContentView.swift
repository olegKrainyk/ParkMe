import SwiftUI

struct ContentView: View {
    @State private var message = ""

    var body: some View {
            VStack {
                Text(message)
                    .padding()

                Button("Send Request") {
                    fetchDataFromAPI()
                }
            }
        }

    func fetchDataFromAPI() {
        let apiUrl = "http://127.0.0.1:5000/api/process_image"

        if let url = URL(string: apiUrl) {
            let task = URLSession.shared.dataTask(with: url) { data, response, error in
                if let data = data {
                    do {
                        if let json = try JSONSerialization.jsonObject(with: data, options: []) as? [String: Any] {
                            if let receivedMessage = json["message"] as? String {
                                // Update the message in the UI
                                DispatchQueue.main.async {
                                    self.message = receivedMessage
                                }
                            }
                        }
                    } catch {
                        print("Error parsing JSON: \(error)")
                    }
                } else if let error = error {
                    print("Error: \(error)")
                }
            }
            task.resume()
        }
    }
}

