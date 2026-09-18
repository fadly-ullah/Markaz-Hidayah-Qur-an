<?php
/**
 * Markaz Hidayah Qur'an - Cloud Sync & Storage API Endpoint
 * Lokasi Hosting: public_html/api/sync.php
 * 
 * Script ini bertindak sebagai database cloud terpusat dan backend storage
 * untuk menghubungkan MacBook, HP, dan pengunjung website secara real-time.
 */

// 1. Izinkan Cross-Origin Resource Sharing (CORS) dari Vercel / Domain Pesantren
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// 2. Tangani Preflight Request (OPTIONS) dari browser
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataFile = __DIR__ . '/pesantren_data.json';
$uploadDir = __DIR__ . '/uploads/';

// Buat folder uploads jika belum ada
if (!file_exists($uploadDir)) {
    @mkdir($uploadDir, 0755, true);
}

// 3. GET: Mengambil Snapshot Data Pesantren Terbaru
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        echo json_encode([
            "status" => "empty",
            "message" => "Database di hosting Rumahweb belum berisi data. Silakan klik tombol 'Kirim Data ke Hosting' di Panel Admin.",
            "serverTime" => date('Y-m-d H:i:s')
        ]);
    }
    exit();
}

// 4. POST: Menyimpan Data Pesantren Terbaru dari Admin (MacBook / HP)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $decoded = json_decode($rawInput, true);

    if ($decoded && is_array($decoded)) {
        // Simpan data lengkap ke file JSON
        $saved = @file_put_contents($dataFile, json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        
        if ($saved !== false) {
            echo json_encode([
                "status" => "success",
                "message" => "Data pesantren berhasil disimpan di hosting Rumahweb.",
                "syncedAt" => date('Y-m-d H:i:s'),
                "bytesWritten" => $saved
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Gagal menulis file pesantren_data.json di server. Pastikan folder public_html/api/ memiliki permission 755 atau 777 di File Manager cPanel."
            ]);
        }
    } else {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Format payload JSON yang dikirimkan tidak valid."
        ]);
    }
    exit();
}

// Default method not allowed
http_response_code(405);
echo json_encode(["status" => "error", "message" => "Method not allowed"]);
