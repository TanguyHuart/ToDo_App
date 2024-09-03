Objectif
Le but de ce test est de créer une application du type "liste de tâches".
Voici la liste de fonctionnalités attendues:
L'utilisateur doit pouvoir créer des tâches à partir d'une liste vide 
==>   OK
L'utilisateur doit pouvoir indiquer qu'une tâche est complétée ou non. 
 ==>   OK
L'utilisateur doit pouvoir savoir lorsqu'une tâche à été créée, et lorsqu'elle à été complétée.
L'utilisateur doit pouvoir changer le nom d'une tâche.  
==> OK
L'utilisateur doit pouvoir supprimer une tâche.     
 ==> OK
L'utilisateur doit pouvoir ré-ordonner les tâches.  
==> OK seulement sur les taches root
L'utilisateur doit avoir accès aux actions applicables sur une tâche via un menu             
==> OK
L'utilisateur doit pouvoir ajouter des tâches avant ou après des taches existantes                 
L'utilisateur doit pouvoir ajouter une ou plusieures sous-tâches à une tâche, celles-ci pouvant aussi avoir des sous-tâches, et ainsi de suite, sans limite de profondeur       ==> OK
L'utilisateur doit pouvoir manipuler les sous tâches commes les tâches de base  
=+> OK sauf pour le drag and drop 
L'utilisateur ne peut pas compléter une tâche parent si toutes les sous-tâches ne sont pas complétées. Également, si toutes les sous-tâches d'une tâche sont complétées, alors la tâche parent doit être indiquée comme complète 
==> OK
L'utilisateur doit pouvoir uploader une liste de tâches depuis un fichier json.
L'utilisateur doit pouvoir télécharger sa liste de tâches en un fichier json.

// A FAIRE

Crée une interface basique pour l'instant :

- Un input text pour rentrér le nom des tâches , une liste affichant les tâches .
  Le type de la tâche : id , nom de la tâche , un objet tâche. ( réfléchir pour récupérer si la sous tache est validée)

- Un bouton pour valider l'input de la tâche et créer la tâche
  ( comment faire en sorte de spécifier l'emplacement de la tâche par rapport aux autres)

-un bouton menu comprenant :

- un bouton pour indiquer que a tâche est complétée avec sa fonction seulement si les sous tâche sont sont complétée
- un bouton supprimer la tâche
- un bouton pour changer le nom de la tâche

Chaque sous tâche est comme une tâche

Upload et écriture sur un fichier Json

réorganisation => drag and drop ?
