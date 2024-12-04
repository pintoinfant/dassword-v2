# Decentralized Password Manager 🔑🛡️ (Lit Protocol + Shamir Secret Sharing)

This open-source project provides a decentralized password manager, enhancing security and user control. We utilize Lit Protocol for secure access control, Shamir's Secret Sharing for key distribution, SQLite for local data storage managed by PocketBase (as a Backend-as-a-Service), and React with Chakra UI for a user-friendly interface.

## Purpose 🚀

Traditional password managers are vulnerable to single points of failure. This project mitigates this risk by:

* **Decentralized Key Management:** Shamir's Secret Sharing distributes your encryption key across multiple nodes, preventing single points of failure. Even if some nodes are compromised, your data remains safe. 🛡️
* **Secure Encryption:** Symmetric encryption protects your passwords. Only you, possessing the reconstructed key, can access them. 🔒
* **Lit Protocol Access Control:** Lit Protocol ensures only authorized users (you!) can access your encrypted data. Zero-knowledge proofs guarantee your privacy. 🕵️‍♂️
* **Local Data Storage (SQLite):** Your encrypted data resides in a local SQLite database, managed by PocketBase for simplicity and scalability. This minimizes reliance on external services. 🗄️
* **User-Friendly Interface:** Built with React and Chakra UI for a smooth and intuitive experience. 😊


## Architecture 🏗️

The application is composed of:

1. **Frontend (React + Chakra UI):** Handles user interaction, encryption/decryption using a symmetric key, Shamir's Secret Sharing management, and communication with PocketBase. 💻
2. **Shamir's Secret Sharing:** The core of our key management strategy. The symmetric encryption key is split into shares and distributed securely. The user reconstructs the key upon login. 🧩
3. **Symmetric Encryption:** AES or a similar robust algorithm is used for encrypting the password data before storage. 🤫
4. **PocketBase (Backend-as-a-Service):** Manages the SQLite database containing the *encrypted* password data. PocketBase provides an easy-to-use way to manage and access the database without managing a full backend infrastructure. ☁️
5. **Lit Protocol:** Securely manages access control to the encrypted data. Lit's zero-knowledge approach protects your secrets. 🔑


## Setup 🛠️

### Prerequisites

* Node.js and npm (or yarn)
* PocketBase instance (Create one following their documentation). You'll need the PocketBase URL.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pintoinfant/dassword-v2
   ```

2. Navigate to the project directory:
   ```bash
   cd dassword-v2
   ```

3. Install dependencies:
   ```bash
   npm install  # or yarn install
   ```

4. **Configure Environment Variables:** Create a `.env` file (see `.env.example`) with:
    * `POCKETBASE_URL`: Your PocketBase instance URL.

5. Run the development server:
   ```bash
   npm start  # or yarn start
   ```


## Workflow 🔄

1. **Service Input:** The user provides the service name, username, and password.
2. **Encryption and Key Sharing:** The data is converted to JSON, encrypted using a symmetric key (AES), and the key is then split into shares using Shamir's Secret Sharing.  These shares are stored using the Lit Protocol. The encrypted data is signed using a crypto wallet (specify which one).
3. **Database Storage:** The encrypted JSON data (passwords) and the encrypted symmetric key (managed by Lit Protocol) are stored in the PocketBase SQLite database.
4. **Access and Decryption:** When the user wants to view a service, they request access from the Lit Protocol. If the access control conditions are met (and enough shares are available to reconstruct the key), the Lit Protocol provides the shares, the client-side reconstructs the symmetric key, and decrypts the data.

## Contributing 🤝

Contributions are welcome! Please:

* Open an issue to report bugs or suggest features. 🐛
* Fork the repository and submit pull requests. PRs that improve security are especially appreciated! ⬆️


## Disclaimer ⚠️

This is open-source software. Use at your own risk. While we've implemented strong security measures, no system is perfectly secure. Thorough testing and security audits are essential before deploying this in a production environment. The specifics of Shamir's Secret Sharing implementation and key recovery processes are crucial for security. Clearly document these aspects.  Consider using a well-vetted library for Shamir's Secret Sharing to ensure robust implementation.
