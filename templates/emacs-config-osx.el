(load-file (concat (file-name-directory (or (buffer-file-name) load-file-name)) "/my.el"))

(custom-set-faces '(default ((t (:height 120 :family "Inconsolata")))))

(setq mac-option-modifier 'super)
(setq mac-command-modifier 'meta)
(setq ns-function-modifier 'hyper)

;; Norwegian mac-keyboard alt-keys)
(define-key key-translation-map (kbd "s-8") (kbd "["))
(define-key key-translation-map (kbd "s-(") (kbd "{"))
(define-key key-translation-map (kbd "s-9") (kbd "]"))
(define-key key-translation-map (kbd "s-)") (kbd "}"))
(define-key key-translation-map (kbd "s-7") (kbd "|"))
(define-key key-translation-map (kbd "s-/") (kbd "\\"))
(define-key key-translation-map (kbd "M-s-7") (kbd "M-|"))
