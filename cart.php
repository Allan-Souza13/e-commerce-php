<?php
header("Access-Control-Allow-Methods: POST");
session_start();

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'add':
                addToCart($_POST['title'], $_POST['price'], $_POST['quantity'], $_POST['image']);
                break;
            case 'remove':
                removeFromCart($_POST['title']);
                break;
            case 'clear':
                clearCart();
                break;
        }
    }
}

function addToCart($title, $price, $quantity, $image)
{
    $item = [
        'title' => $title,
        'price' => $price,
        'quantity' => $quantity,
        'image' => $image,
    ];

    array_push($_SESSION['cart'], $item);
}

function removeFromCart($title)
{
    foreach ($_SESSION['cart'] as $key => $item) {
        if ($item['title'] === $title) {
            unset($_SESSION['cart'][$key]);
            break;
        }
    }

    $_SESSION['cart'] = array_values($_SESSION['cart']);
}

function clearCart()
{
    $_SESSION['cart'] = [];
}
?>
